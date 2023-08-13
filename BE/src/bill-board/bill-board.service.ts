import { Injectable } from '@nestjs/common';
import { BillBoard } from '@prisma/client';
import { CreateBillBoardDto } from './dto/create-bill-board.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ethers } from 'ethers';
import * as abi from '../blockchain-interface/abi.json';

const mainContractAddress = process.env.ADDRESS;

@Injectable()
export class BillBoardService {
  private provider: ethers.providers.JsonRpcProvider;
  private mainContract: ethers.Contract;
  constructor(private prisma: PrismaService) {
    this.provider = new ethers.providers.JsonRpcBatchProvider(process.env.API_URL);
    this.mainContract = new ethers.Contract(mainContractAddress, abi, this.provider);
  }

  public async getFileUrl(id: string) {
    const BillBoard = await this.prisma.billBoard.findUnique({
      where: { id: id },
    });
    return BillBoard?.videoUrl;
  }

  public async setFileUrl(videoUrl: string, walletAddress: string) {
    await this.prisma.billBoard.update({
      where: { id: walletAddress },
      data: {
        videoUrl: videoUrl,
      },
    });
  }

  public async create(createBillBoardDto: CreateBillBoardDto): Promise<BillBoard> {
    try {
      const BillBoard = await this.prisma.billBoard.create({
        data: {
          walletAddress: createBillBoardDto.walletAddress,
          GeoX: createBillBoardDto.GeoX,
          GeoY: createBillBoardDto.GeoY,
        },
      });

      return BillBoard;
    } catch (error) {
      throw error;
    }
  }
  public async findAll() {
    try {
      const billBoards = await this.prisma.billBoard.findMany({
        select: {
          id: true,
          walletAddress: true,
        },
      });
      return billBoards;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: string) {
    return this.prisma.billBoard.findUnique({
      where: { id },
      select: {
        id: true,
        walletAddress: true,
        GeoX: true,
        GeoY: true
      },
    });
  }

  public async findAllBillBoard() {
    try {
      
        const totalTokens = await this.mainContract.billboard_token_list_length();
        console.log(totalTokens);
        const billboardData = [];

        for (let i = 0; i < totalTokens; i++) {
          const billboardInfo = await this.mainContract.billboards_map(i);
          const billboardId = await this.mainContract.billboard_token_list(i);
          console.log(billboardId)
            // const walletAddress = billboardInfo.walletAddress;

            const billboard = {
                id: billboardId,
                info: billboardInfo
            };
            billboardData.push(billboard);
        }

        return billboardData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
  }
  public async remove(id: string) {
    return this.prisma.billBoard.delete({ where: { id } });
  }
}
