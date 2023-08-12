const { ethers } = require("hardhat");

const contract_address = 0x6C485D7197e0018B5B11F6A0129b1a3f3409987d;
// const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    const deployedAddress = "0x6C485D7197e0018B5B11F6A0129b1a3f3409987d";
    const YourContract = await ethers.getContractFactory("BlockBoard");
    const contractInstance = YourContract.attach(deployedAddress);

    const tx = await contractInstance.registerBillboard(1000, 1000);
    await tx.wait();
    console.log("Transaction has been mined!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
