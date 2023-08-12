import { Injectable } from '@nestjs/common';
import { BillBoard } from '@prisma/client';
import { CreateBillBoardDto } from './dto/create-bill-board.dto';
import { UpdateBillBoardDto } from './dto/update-bill-board.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillBoardService {
  constructor(private prisma: PrismaService) {}

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

  public async remove(id: string) {
    return this.prisma.billBoard.delete({ where: { id } });
  }
}
