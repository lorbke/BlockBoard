const { ethers } = require("hardhat");
require('dotenv').config();

const contract_address = process.env.MAIN_CONTRACT_ADDR;

async function main() {
    const YourContract = await ethers.getContractFactory("BlockBoard");
    const contractInstance = YourContract.attach(contract_address);

    const tx = await contractInstance.rentBillboard("https://raw.githubusercontent.com/lorbke/BlockBoard/contracts/pic3.gif", 1, 200, {value: ethers.utils.parseEther("0.01")});
    await tx.wait();
    console.log("Transaction has been mined!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
