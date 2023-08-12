const { ethers } = require("hardhat");

const contract_address = 0x6C485D7197e0018B5B11F6A0129b1a3f3409987d;
// const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    const deployedAddress = "0xf5bd7ff5D55B21aBbB814F6FC906766c2E233e4a";
    const YourContract = await ethers.getContractFactory("BlockBoard");
    const contractInstance = YourContract.attach(deployedAddress);

    const tx = await contractInstance.rentBillboard("https://piconomix.com/px-fwlib/animation.gif", 1, 1, {value: ethers.utils.parseEther("0.01")});
    await tx.wait();
    console.log("Transaction has been mined!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
