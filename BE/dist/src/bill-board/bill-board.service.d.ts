import { BillBoard } from '@prisma/client';
import { CreateBillBoardDto } from './dto/create-bill-board.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class BillBoardService {
    private prisma;
    constructor(prisma: PrismaService);
    getFileUrl(id: string): Promise<string>;
    setFileUrl(videoUrl: string, walletAddress: string): Promise<void>;
    create(createBillBoardDto: CreateBillBoardDto): Promise<BillBoard>;
    findAll(): Promise<{
        id: string;
        walletAddress: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        walletAddress: string;
        GeoX: string;
        GeoY: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        walletAddress: string;
        createdAt: Date;
        videoUrl: string;
        GeoX: string;
        GeoY: string;
        status: import(".prisma/client").$Enums.BillBoardStatus;
        renterId: string;
    }>;
}
