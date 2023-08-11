// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract BlockBoard {

	// @todo do all error handling
	// @todo do some testing
	// @todo rename variables to shorthand for billboards

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

	constructor() {
	}

	function registerBillboard(uint256 geo_lat, uint256 geo_y) public {
		require (billboards_map[msg.sender].addr == address(0), "Billboard already exists");
		GeoPoint memory location = GeoPoint(geo_lat, geo_y);
		Billboard memory billboard = Billboard(0, msg.sender, location, "", address(0), 0, 0);
		billboards_map[msg.sender] = billboard;
		billboards_list.push(billboard);
	}

	// @todo add getter to check if renter died

	function killRenter(address billboard_addr) public {
		// @note pay a bounty here?
		uint256 block_of_rent = billboards_map[billboard_addr].block_of_rent;
		uint256 cost_per_block = billboards_map[billboard_addr].cost_per_block;
		address renter = billboards_map[billboard_addr].renter;
		uint256 accumulated_costs = (block.number - block_of_rent) * cost_per_block;
		require (renter_stakes[renter] < accumulated_costs, "Renter still has enough stake to cover costs"); // @todo define threshhold to use rest for bounty

		renter_stakes[renter] -= accumulated_costs;
		billboards_map[billboard_addr].cost_per_block = 0;
	}

	function rentBillboard(string memory ad_url, address billboard_addr, uint256 cost_per_block) public payable {
		require (billboards_map[billboard_addr].addr != address(0), "Billboard does not exist");
		require (billboards_map[billboard_addr].cost_per_block < cost_per_block, "Cost per block is too low");
		require (msg.value > cost_per_block, "Not enough stake provided");
		renter_stakes[msg.sender] = msg.value;
		billboards_map[billboard_addr].renter = msg.sender;
		billboards_map[billboard_addr].cost_per_block = cost_per_block;
		billboards_map[billboard_addr].block_of_rent = block.number;
		billboards_map[billboard_addr].ad_url = ad_url;
		killRenter(billboard_addr);
	}

	// @note problem: renter can unstake before he is killed, even though he theoretically died
	function unstakeRent() public {
		payable(msg.sender).transfer(renter_stakes[msg.sender]);
		renter_stakes[msg.sender] = 0;
	}
}