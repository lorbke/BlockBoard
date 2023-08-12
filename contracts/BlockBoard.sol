// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract BlockBoard {

	// @todo do all error handling
	// @todo do some testing
	// @todo rename variables to shorthand for billboards
	// @todo switch billboard address to NFT??

	struct GeoPoint {
		uint256 lat; // 48.284306 // 48284306 -> multiplied by 10^6
		uint256 long;
	}

	struct Billboard {
		uint256 earnings;
		address addr;
		GeoPoint location;
		string ad_url;
		address renter;
		uint256 cost_per_block;
		uint256 block_of_rent;
	}

	mapping(address => Billboard) billboards_map;
	Billboard[] billboards_list;
	mapping(address => uint256) renter_stakes;

	uint256 constant BOUNTY_PERCENTAGE = 2;

	constructor() {
	}

	// @todo add initial stake to register billboard
	function registerBillboard(uint256 geo_lat, uint256 geo_y) public {
		require (billboards_map[msg.sender].addr == address(0), "Billboard already exists");

		GeoPoint memory location = GeoPoint(geo_lat, geo_y);
		Billboard memory billboard = Billboard(0, msg.sender, location, "", address(0), 0, 0);
		billboards_map[msg.sender] = billboard;
		billboards_list.push(billboard);
	}

	// get earnings of billboard
	function getRentForBillboard(address billboard_addr) public view returns (uint256 accumulated) {
		require (billboards_map[billboard_addr].addr != address(0), "Billboard does not exist");
		uint256 block_of_rent = billboards_map[billboard_addr].block_of_rent;
		uint256 cost_per_block = billboards_map[billboard_addr].cost_per_block;

		return (block.number - block_of_rent) * cost_per_block;
	}

	function getRenterAccumulated(address renter_addr) public view returns (uint256 accumulated) {
		for (uint256 i = 0; i < billboards_list.length; i++) {
			if (billboards_list[i].renter == renter_addr)
				accumulated += getRentForBillboard(billboards_list[i].addr);
		}
		return accumulated;
	}

	function settleRentForBillboard(address billboard_addr) private {
		uint256 accumulated = getRentForBillboard(billboard_addr);
		address renter = billboards_map[billboard_addr].renter;

		uint256 stake_before = renter_stakes[renter];
		renter_stakes[renter] -= accumulated;
		uint256 stake_after = renter_stakes[renter];
		billboards_map[billboard_addr].earnings += stake_before - stake_after;
	}

	function settleRentAll(address renter_addr) private {
		for (uint256 i = 0; i < billboards_list.length; i++) {
			if (billboards_list[i].renter == renter_addr)
				settleRentForBillboard(billboards_list[i].addr);
		}
	}

	// gelato bot can call this
	function killRenter(address renter_addr) public {
		require (renter_stakes[renter_addr] > 0, "Renter has no stake");
		uint256 total_accumulated = getRenterAccumulated(renter_addr);
		uint256 bounty = total_accumulated * (BOUNTY_PERCENTAGE / 100);
		require (renter_stakes[renter_addr] <= total_accumulated + bounty, "Renter still has enough stake to cover costs");
		bounty = renter_stakes[renter_addr] - total_accumulated;
		if (bounty < 0)
			bounty = 0;

		renter_stakes[renter_addr] -= bounty;
		payable(msg.sender).transfer(bounty);

		settleRentAll(renter_addr);
	}

	function rentBillboard(string memory ad_url, address billboard_addr, uint256 cost_per_block) public payable {
		require (billboards_map[billboard_addr].addr != address(0), "Billboard does not exist");
		require (billboards_map[billboard_addr].cost_per_block <= cost_per_block, "Cost per block is too low");
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
		settleRentAll(msg.sender);
		payable(msg.sender).transfer(renter_stakes[msg.sender]);
		renter_stakes[msg.sender] = 0;
	}
}