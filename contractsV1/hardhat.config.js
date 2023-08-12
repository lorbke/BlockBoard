/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice: 800000000
      },
      zkevm: {
         url: `https://rpc.public.zkevm-test.net`,
         accounts: [`0x${PRIVATE_KEY}`],
      },
   },
};