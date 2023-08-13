import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as abi from './abi.json';

const mainContractAddress = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY

@Injectable()
export class BlockchainInterfaceService {
  private provider: ethers.providers.JsonRpcProvider;
  private mainContract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
    this.mainContract = new ethers.Contract(mainContractAddress, abi, this.provider);
  }
  async getAd(billboardId: number): Promise<string> {
    return await this.mainContract.getAd(billboardId);
  }

  async registerBillboard(geoLat: number, geoLong: number): Promise<void> {
    return await this.mainContract.getAd(geoLat, geoLong);
  }

  async rentBillboard(ad_url: string, billboard_token_id: number, cost_per_block: number) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
      const signer = new ethers.Wallet(privateKey, provider)
      const randomContract = new ethers.Contract(mainContractAddress, abi, signer);
      return await randomContract.rentBillboard(ad_url, billboard_token_id, cost_per_block, {value: ethers.utils.parseEther("0.0001")} );
    } catch (error) {
      throw error;
    }
  }

  async killRenter(renterAdress: string) {
    return await this.mainContract.killRenter(renterAdress);
  }

  async unstakeRent() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
      const signer = new ethers.Wallet(privateKey, provider)
      const randomContract = new ethers.Contract(mainContractAddress, abi, signer);
    return await randomContract.unstakeRent();
  }
}
