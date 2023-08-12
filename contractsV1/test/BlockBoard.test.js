const { expect } = require("chai");
const { ethers } = require("hardhat");	

async function mineBlocks(numberOfBlocks) {
	for (let i = 0; i < numberOfBlocks; i++) {
	//   console.log(await ethers.provider.getBlockNumber());
	  await hre.network.provider.send("evm_mine");
	}
}
  
describe("BlockBoard: basics and getters", function () {
	let blockBoard;
	let owner;
	let renter;

  before(async function () {
	const signers = await ethers.getSigners();
	owner = signers[0];
	renter = signers[1];

	const BlockBoardNFT = await ethers.getContractFactory("BlockBoardNFT");
	blockBoardNFT = await BlockBoardNFT.deploy();
	await blockBoardNFT.deployed();

    const BlockBoard = await ethers.getContractFactory("BlockBoard");
    blockBoard = await BlockBoard.deploy(blockBoardNFT.address);
    await blockBoard.deployed();
});

it("should allow registering a billboard", async function () {
	await blockBoard.connect(owner).registerBillboard(48284306, 12345678);
	billboard_id = await blockBoardNFT.tokenOfOwnerByIndex(owner.address, 0);
	const billboard = await blockBoard.billboards_map(billboard_id);
    expect(billboard.owner).to.not.equal(ethers.constants.AddressZero);
	expect(billboard.owner).to.equal(owner.address);
	const billboard2 = await blockBoard.billboards_map(billboard_id);
	expect(billboard2.owner).to.equal(owner.address);
});

it("should allow renting a billboard", async function () {
	const ad_url = "https://example.com";
	const cost_per_block = ethers.utils.parseEther("0.1");
	const renter_stake = ethers.utils.parseEther("1");
	billboard_id = await blockBoardNFT.tokenOfOwnerByIndex(owner.address, 0);
    await blockBoard.connect(renter).rentBillboard(ad_url, billboard_id, cost_per_block, {
		value: renter_stake,
    });
    const billboard = await blockBoard.billboards_map(billboard_id);
	const contract_renter_stake = await blockBoard.renter_stakes(renter.address);
    expect(billboard.renter).to.equal(renter.address);
	expect(billboard.block_of_rent).to.equal(await ethers.provider.getBlockNumber());
	expect(contract_renter_stake).to.equal(renter_stake);
	expect(billboard.cost_per_block).to.equal(cost_per_block);
	expect(billboard.ad_url).to.equal(ad_url);
  });

  it("should calculate accumulated rent for a single billboard", async function () {
	await mineBlocks(9);
	billboard_id = await blockBoardNFT.tokenOfOwnerByIndex(owner.address, 0);
	const rent = await blockBoard.getRentForBillboard(billboard_id);
    expect(rent).to.be.gt(0);
	expect(rent).to.equal(ethers.utils.parseEther("0.9"));
  });

  it("should show accumulated rent for a renter", async function () {
	const rent = await blockBoard.getRenterAccumulatedTotal(renter.address);
	expect(rent).to.be.gt(0);
	expect(rent).to.equal(ethers.utils.parseEther("0.9"));
  });

  it("should show accumulated rent per block for a renter", async function () {
	const rent = await blockBoard.getRenterAccumulatingPerBlock(renter.address);
	expect(rent).to.be.gt(0);
  });

  it("should return a url", async function () {
	const url = await blockBoard.getAd(1);
	expect(url).to.equal("https://example.com");
  });

  // @todo add getters

  // Additional tests can be added to cover more scenarios
});

describe("BlockBoard: fancy shit", function () {
	let blockBoard;
	let owner;
	let renter;
	let killer;

  beforeEach(async function () {
	const signers = await ethers.getSigners();
	owner = signers[0];
	renter = signers[1];
	killer = signers[2];

	const BlockBoardNFT = await ethers.getContractFactory("BlockBoardNFT");
	blockBoardNFT = await BlockBoardNFT.deploy();
	await blockBoardNFT.deployed();

    const BlockBoard = await ethers.getContractFactory("BlockBoard");
    blockBoard = await BlockBoard.deploy(blockBoardNFT.address);
    await blockBoard.deployed();

	// prepare for test
	await blockBoard.connect(owner).registerBillboard(48284306, 12345678);
	const ad_url = "https://example.com";
	const cost_per_block = ethers.utils.parseEther("0.1");
	const renter_stake = ethers.utils.parseEther("1");
	billboard_id = await blockBoardNFT.tokenOfOwnerByIndex(owner.address, 0);
    await blockBoard.connect(renter).rentBillboard(ad_url, billboard_id, cost_per_block, {
      value: renter_stake,
    });
	console.log("renter address of billboard: ", blockBoard.billboards_map(billboard_id).renter);
	await mineBlocks(8);
  });

  it("should allow unstaking rent", async function () {
	const renter_balance_before = await ethers.provider.getBalance(renter.address);
    await blockBoard.connect(renter).unstakeRent();
	const renter_balance_after = await ethers.provider.getBalance(renter.address);

    const stake = await blockBoard.renter_stakes(renter.address);
    expect(stake).to.equal(0);
	expect(renter_balance_after).to.be.gt(renter_balance_before);
  });

  it("should allow anyone to kill a renter", async function () {
	await mineBlocks(0);
	const billboard = await blockBoard.billboards_map(owner.address);
	const killer_balance_before = await ethers.provider.getBalance(killer.address);
	console.log("renter stake: ", await blockBoard.renter_stakes(renter.address));
	await blockBoard.connect(killer).killRenter(renter.address);
	console.log("renter stake: ", await blockBoard.renter_stakes(renter.address));
	const killer_balance_after = await ethers.provider.getBalance(killer.address);
	console.log("bounty: ", killer_balance_after.sub(killer_balance_before));
	expect(killer_balance_after).to.be.gt(killer_balance_before);
	
	const stake = await blockBoard.renter_stakes(renter.address);
  });
});
