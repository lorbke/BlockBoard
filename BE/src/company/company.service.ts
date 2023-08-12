import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from '@prisma/client';
import { ethers } from 'ethers';
import * as abi from '../blockchain-interface/abi.json';

const mainContractAddress = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY


@Injectable()
export class CompanyService {
  private provider: ethers.providers.JsonRpcProvider;
  private mainContract: ethers.Contract;
  constructor(private prisma: PrismaService) {
    this.provider = new ethers.providers.JsonRpcBatchProvider(process.env.API_URL);
    this.mainContract = new ethers.Contract(mainContractAddress, abi, this.provider);
   }

  public async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const BillBoard = await this.prisma.company.create({
        data: {
          username: createCompanyDto.username,
          privateKey: createCompanyDto.privateKey,
          publicKey: createCompanyDto.publicKey,
          password: createCompanyDto.password
        },
      });

      return BillBoard;
    } catch (error) {
      throw error;
    }
  }

  async createCompany(data:
    Company): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }

  public async findAll() {
    try {
      const companies = await this.prisma.company.findMany({
        select: {
          id: true,
          username: true,
        },
      });
      return companies;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        privateKey: true,
        publicKey: true,
        balance: true,
      },
    });
  }



  public async remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }

  public async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const User = await this.prisma.company.update({
        where: { id: id },
        data: { username: updateCompanyDto.username },
      });

      return User;
    } catch (error) {
      throw error;
    }
  }

  async updateCompanyBalance(id: string, balance: number) {
    try {
      if (id) {
        await this.prisma.company.update({
          where: {
            id: id,
          },
          data: {
            balance: balance,
          },
        });
      }
    } catch (error) { }
  }

  public async getRentedByCompany() {
    console.log('bruuuh')
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
      const signer = new ethers.Wallet(privateKey, provider)
      const totalTokens = await this.mainContract.billboard_token_list_length();
      console.log(totalTokens);
      const billboardData = [];

      for (let i = 0; i < totalTokens; i++) {
        const billboardInfo = await this.mainContract.billboards_map(i);
        const billboardId = await this.mainContract.billboard_token_list(i);
        // const walletAddress = billboardInfo.walletAddress;

        const billboard = {
          id: billboardId,
          info: billboardInfo
        };
        console.log(billboardInfo.renter, signer.address)
        if (billboardInfo.renter == signer.address)
        {
          billboardData.push(billboard);
        }
      }

      return billboardData;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
}
