const { ethers } = require("hardhat");

async function deployBlockBoardNFT() {
    const BlockBoardNFT = await hre.ethers.getContractFactory("BlockBoardNFT");
    const blockBoardNFT = await BlockBoardNFT.deploy();
    await blockBoardNFT.deployed();
    return blockBoardNFT;
}

async function deployBlockBoard() {
	const BlockBoard = await hre.ethers.getContractFactory("BlockBoard");
	const blockBoard = await BlockBoard.deploy();
	await blockBoard.deployed();
	return blockBoard;
}

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const blockBoardNFT = await deployBlockBoardNFT();
	console.log("BlockBoardNFT deployed to:", blockBoardNFT.address);
	const blockBoard = await deployBlockBoard();
	console.log("BlockBoard deployed to:", blockBoard.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
