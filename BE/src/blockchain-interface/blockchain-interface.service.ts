import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as abi from './abi.json';
const Tx = require('ethereumjs-tx').Transaction;
import Web3 from "web3"
// import { ConfigService } from '@nestjs/config'

const mainContractAddress = '0x6C485D7197e0018B5B11F6A0129b1a3f3409987d';
const privateKey = '0x4b917eee098755cf71e138f50aeef0b62cb5af016bb72899f67d317947ab450a'
/*
@Injectable()
export class EthereumService {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'); // Replace with your Infura project ID
  }

  async sendEthTransaction(
    fromAddress: string,
    toAddress: string,
    privateKeyHex: string,
    value: string,
    gasPrice: string,
    gasLimit: number,
  ): Promise<string> {
    const nonce = await this.web3.eth.getTransactionCount(fromAddress);
    const txParams = {
      nonce: this.web3.utils.toHex(nonce),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasPrice, 'gwei')),
      gasLimit: this.web3.utils.toHex(gasLimit),
      to: toAddress,
      value: this.web3.utils.toHex(this.web3.utils.toWei(value, 'ether')),
    };

    const tx = new Tx(txParams, { chain: 'mainnet' }); // Use 'rinkeby' for the Rinkeby testnet
    const privateKey = Buffer.from(privateKeyHex, 'hex');
    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const rawTx = '0x' + serializedTx.toString('hex');

    return new Promise((resolve, reject) => {
      this.web3.eth.sendSignedTransaction(rawTx)
        .on('transactionHash', (txHash) => resolve(txHash))
        .on('error', (err) => reject(err));
    });
  }
}

*/
@Injectable()
export class BlockchainInterfaceService {
  private provider: ethers.providers.JsonRpcProvider;
  private mainContract: ethers.Contract;
  private companyWallet: ethers.Wallet;
  // ... other contracts

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
    console.log(this.provider)
    // const signer = new ethers.Wallet(privateKey, this.provider)
    // const randomContract = new ethers.Contract(mainContractAddress, abi, signer)
    this.mainContract = new ethers.Contract(mainContractAddress, abi, this.provider);
  }
  async getAd(billboardId: number): Promise<string> {
    return await this.mainContract.getAd(billboardId);
  }

  async registerBillboard(geoLat: number, geoLong: number): Promise<void> {
    return await this.mainContract.getAd(geoLat, geoLong);
  }

  async rentBillboard(ad_url: string, billboard_token_id: number, cost_per_block: number) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
    const signer = new ethers.Wallet(privateKey, provider)
    const randomContract = new ethers.Contract(mainContractAddress, abi, signer);
    return await randomContract.rentBillboard(ad_url, billboard_token_id, cost_per_block, {value: ethers.utils.parseEther("0.0001")} );
    // return await randomContract.rentBillboard('123', 2, 1, {value: ethers.utils.parseEther("0.0001")} );
  }

  async killRenter(renterAdress: string) {
    return await this.mainContract.killRenter(renterAdress);
  }

  async unstakeRent() {
    return await this.mainContract.unstakeRent();
  }
}
