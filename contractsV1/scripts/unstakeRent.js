const { ethers } = require("hardhat");

const contract_address = 0x6C485D7197e0018B5B11F6A0129b1a3f3409987d;
// const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    const deployedAddress = "0xC46f60b22Fbd638913f1d8241E66aDb369108FEd";
    const YourContract = await ethers.getContractFactory("BlockBoard");
    const contractInstance = YourContract.attach(deployedAddress);

    const result = await contractInstance.unstakeRent();
	console.log(result);
    console.log("Transaction has been mined!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
