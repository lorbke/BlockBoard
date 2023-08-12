// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract BlockBoard {

	// @todo switch billboard address to NFT??
	// @todo add events
	// @todo custom token integration
	// @todo add initial stake to register billboard
	// @todo reporting mechanism

	struct GeoPoint {
		uint256 lat; // 48.284306 // 48284306 -> multiplied by 10^6
		uint256 long;
	}

	struct Billboard {
		uint256 earnings;
		address owner;
		GeoPoint location;
		string ad_url;
		address renter;
		uint256 cost_per_block;
		uint256 block_of_rent;
	}

	uint256 constant public BOUNTY_PERCENTAGE = 2;

	mapping(address => Billboard) public billboards_map;
	address[] public billboard_owners_list;
	mapping(address => uint256) public renter_stakes;

	constructor() {
	}

	function getAd(address billboard_addr) public pure returns (string memory ad_url) {
		// return billboards_map[billboard_addr].ad_url;
		billboard_addr = address(0);
		return "https://raw.githubusercontent.com/lorbke/BlockBoard/main/assets/default_hardware.gif";
	}

	function registerBillboard(uint256 geo_lat, uint256 geo_y) public {
		require (billboards_map[msg.sender].owner == address(0), "Billboard already exists");

		GeoPoint memory location = GeoPoint(geo_lat, geo_y);
		Billboard memory billboard = Billboard(0, msg.sender, location, "", address(0), 0, 0);
		billboards_map[msg.sender] = billboard;
		billboard_owners_list.push(msg.sender);
	}

	// get earnings of billboard
	function getRentForBillboard(address billboard_addr) public view returns (uint256 accumulated) {
		require (billboards_map[billboard_addr].owner != address(0), "Billboard does not exist");
		uint256 block_of_rent = billboards_map[billboard_addr].block_of_rent;
		uint256 cost_per_block = billboards_map[billboard_addr].cost_per_block;

		return (block.number - block_of_rent) * cost_per_block;
	}

	function getRenterAccumulatedTotal(address renter_addr) public view returns (uint256 accumulated) {
		for (uint256 i = 0; i < billboard_owners_list.length; i++) {
			Billboard memory curr = billboards_map[billboard_owners_list[i]];
			if (curr.renter == renter_addr)
				accumulated += getRentForBillboard(curr.owner);
		}
		return accumulated;
	}

	function getRenterAccumulatingPerBlock(address renter_addr) public view returns (uint256 accumulating_per_block) {
		for (uint256 i = 0; i < billboard_owners_list.length; i++) {
			Billboard memory curr = billboards_map[billboard_owners_list[i]];
			if (curr.renter == renter_addr)
				accumulating_per_block += curr.cost_per_block;
		}
		return accumulating_per_block;
	}

	function settleRentForBillboard(address billboard_addr) private {
		uint256 accumulated = getRentForBillboard(billboard_addr);
		address renter = billboards_map[billboard_addr].renter;

		uint256 stake_before = renter_stakes[renter];
		if (renter_stakes[renter] > accumulated)
			renter_stakes[renter] -= accumulated;
		else
			renter_stakes[renter] = 0;
		uint256 stake_after = renter_stakes[renter];
		billboards_map[billboard_addr].earnings += stake_before - stake_after;
		billboards_map[billboard_addr].cost_per_block = 0;
		billboards_map[billboard_addr].renter = address(0);
	}

	function settleAllRentForRenter(address renter_addr) private {
		for (uint256 i = 0; i < billboard_owners_list.length; i++) {
			Billboard memory curr = billboards_map[billboard_owners_list[i]];
			if (curr.renter == renter_addr)
				settleRentForBillboard(curr.owner);
		}
	}

	// gelato bot can call this
	// @todo fix weird bounty bug; there should always be a bounty
	function killRenter(address renter_addr) public {
		require (renter_stakes[renter_addr] > 0, "Renter has no stake");
		uint256 total_accumulated = getRenterAccumulatedTotal(renter_addr);
		uint256 accumulating_per_block = getRenterAccumulatingPerBlock(renter_addr);
		uint256 bounty = renter_stakes[renter_addr] * BOUNTY_PERCENTAGE / 100;
		require (renter_stakes[renter_addr] <= total_accumulated + accumulating_per_block * 2 + bounty, "Renter still has enough stake to cover costs");

		renter_stakes[renter_addr] -= bounty;
		payable(msg.sender).transfer(bounty);

		settleAllRentForRenter(renter_addr);
	}

	function rentBillboard(string memory ad_url, address billboard_addr, uint256 cost_per_block) public payable {
		require (billboards_map[billboard_addr].owner != address(0), "Billboard does not exist");
		require (billboards_map[billboard_addr].cost_per_block <= cost_per_block, "New cost per block has to be higher than previous cost per block");
		require (msg.value >= cost_per_block, "Not enough stake provided");

		settleRentForBillboard(billboard_addr);

		renter_stakes[msg.sender] = msg.value;
		billboards_map[billboard_addr].renter = msg.sender;
		billboards_map[billboard_addr].cost_per_block = cost_per_block;
		billboards_map[billboard_addr].block_of_rent = block.number;
		billboards_map[billboard_addr].ad_url = ad_url;
	}

	function unstakeRent() public {
		require (renter_stakes[msg.sender] > 0, "Renter has no stake");

		settleAllRentForRenter(msg.sender);
		payable(msg.sender).transfer(renter_stakes[msg.sender]);
		renter_stakes[msg.sender] = 0;
	}
}