import { BillBoardService } from './bill-board.service';
import { CreateBillBoardDto } from './dto/create-bill-board.dto';
export declare class BillBoardController {
    private readonly billBoardService;
    constructor(billBoardService: BillBoardService);
    create(createBillBoardDto: CreateBillBoardDto): Promise<{
        id: string;
        walletAddress: string;
        createdAt: Date;
        videoUrl: string;
        GeoX: string;
        GeoY: string;
        status: import(".prisma/client").$Enums.BillBoardStatus;
        renterId: string;
    }>;
    findAllBillBoard(): Promise<any[]>;
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
