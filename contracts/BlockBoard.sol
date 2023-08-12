// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

interface IBlockBoardNFT {
	function mint(address recipient) external returns (uint256 token_id);
}

contract BlockBoard {

	// @todo switch billboard address to NFT??
	// @todo add events
	// @todo custom token integration
	// @todo add initial stake to register billboard
	// @todo reporting mechanism

	/*------------------------------------------------------------------------------------*/
	/* 	DATA STRUCTURE                                                                    */
	/*------------------------------------------------------------------------------------*/

	IBlockBoardNFT nft_contract;

	struct GeoPoint {
		uint256 lat; // 48.284306 // 48284306 -> multiplied by 10^6
		uint256 long;
	}

	struct Billboard {
		bool exists;
		uint256 earnings;
		uint256 token_id;
		address owner;
		GeoPoint location;
		string ad_url;
		address renter;
		uint256 cost_per_block;
		uint256 block_of_rent;
	}

	uint256 constant public BOUNTY_PERCENTAGE = 2;

	mapping(uint256 => Billboard) public billboards_map;
	uint256[] public billboard_token_list;
	mapping(address => uint256) public renter_stakes;

	/*------------------------------------------------------------------------------------*/
	/* 	CONSTRUCTOR                                                                       */
	/*------------------------------------------------------------------------------------*/

	constructor(address nft_contract_addr) {
		nft_contract = IBlockBoardNFT(nft_contract_addr);
	}

	/*------------------------------------------------------------------------------------*/
	/* 	HELPER FUNCTIONS                                                                  */
	/*------------------------------------------------------------------------------------*/

	// get earnings of billboard
	function getRentForBillboard(uint256 billboard_token_id) public view returns (uint256 accumulated) {
		require (billboards_map[billboard_token_id].exists == true, "Billboard does not exist");
		uint256 block_of_rent = billboards_map[billboard_token_id].block_of_rent;
		uint256 cost_per_block = billboards_map[billboard_token_id].cost_per_block;

		return (block.number - block_of_rent) * cost_per_block;
	}

	function getRenterAccumulatedTotal(address renter_addr) public view returns (uint256 accumulated) {
		accumulated = 0;
		for (uint256 i = 0; i < billboard_token_list.length; i++) {
			Billboard memory curr = billboards_map[billboard_token_list[i]];
			if (curr.renter == renter_addr)
				accumulated += getRentForBillboard(curr.token_id);
		}
		return accumulated;
	}

	function getRenterAccumulatingPerBlock(address renter_addr) public view returns (uint256 accumulating_per_block) {
		accumulating_per_block = 0;
		for (uint256 i = 0; i < billboard_token_list.length; i++) {
			Billboard memory curr = billboards_map[billboard_token_list[i]];
			if (curr.renter == renter_addr)
				accumulating_per_block += curr.cost_per_block;
		}
		return accumulating_per_block;
	}

	function settleRentForBillboard(uint256 billboard_token_id) private {
		uint256 accumulated = getRentForBillboard(billboard_token_id);
		address renter = billboards_map[billboard_token_id].renter;

		uint256 stake_before = renter_stakes[renter];
		if (renter_stakes[renter] > accumulated)
			renter_stakes[renter] -= accumulated;
		else
			renter_stakes[renter] = 0;
		uint256 stake_after = renter_stakes[renter];
		billboards_map[billboard_token_id].earnings += stake_before - stake_after;
		billboards_map[billboard_token_id].cost_per_block = 0;
		billboards_map[billboard_token_id].renter = address(0);
	}

	function settleAllRentForRenter(address renter_addr) private {
		for (uint256 i = 0; i < billboard_token_list.length; i++) {
			Billboard memory curr = billboards_map[billboard_token_list[i]];
			if (curr.renter == renter_addr)
				settleRentForBillboard(curr.token_id);
		}
	}

	/*------------------------------------------------------------------------------------*/
	/* 	MAIN FUNCTIONS                                                                    */
	/*------------------------------------------------------------------------------------*/

	function getAd(address billboard_addr) public pure returns (string memory ad_url) {
		// return billboards_map[billboard_addr].ad_url;
		billboard_addr = address(0);
		return "https://raw.githubusercontent.com/lorbke/BlockBoard/main/assets/default_hardware.gif";
	}

	function registerBillboard(uint256 geo_lat, uint256 geo_y) public {
		GeoPoint memory location = GeoPoint(geo_lat, geo_y);
		uint256 token_id = nft_contract.mint(msg.sender);
		Billboard memory billboard = Billboard(true, 0, token_id, msg.sender, location, "", address(0), 0, 0);
		billboard_token_list.push(token_id);
		billboards_map[token_id] = billboard;
	}

	function rentBillboard(string memory ad_url, uint256 billboard_token_id, uint256 cost_per_block) public payable {
		require (billboards_map[billboard_token_id].exists == true, "Billboard does not exist");
		require (billboards_map[billboard_token_id].cost_per_block <= cost_per_block, "New cost per block has to be higher than previous cost per block");
		require (msg.value >= cost_per_block, "Not enough stake provided");

		settleRentForBillboard(billboard_token_id);

		renter_stakes[msg.sender] = msg.value;
		billboards_map[billboard_token_id].renter = msg.sender;
		billboards_map[billboard_token_id].cost_per_block = cost_per_block;
		billboards_map[billboard_token_id].block_of_rent = block.number;
		billboards_map[billboard_token_id].ad_url = ad_url;
	}

	// gelato bot can call this
	// @todo fix weird bounty bug; there should always be a bounty, but if called too late there is none
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

	function unstakeRent() public {
		require (renter_stakes[msg.sender] > 0, "Renter has no stake");

		settleAllRentForRenter(msg.sender);
		payable(msg.sender).transfer(renter_stakes[msg.sender]);
		renter_stakes[msg.sender] = 0;
	}
}