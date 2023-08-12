"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillBoardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BillBoardService = exports.BillBoardService = class BillBoardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFileUrl(id) {
        const BillBoard = await this.prisma.billBoard.findUnique({
            where: { id: id },
        });
        return BillBoard?.videoUrl;
    }
    async setFileUrl(videoUrl, walletAddress) {
        await this.prisma.billBoard.update({
            where: { id: walletAddress },
            data: {
                videoUrl: videoUrl,
            },
        });
    }
    async create(createBillBoardDto) {
        try {
            const BillBoard = await this.prisma.billBoard.create({
                data: {
                    walletAddress: createBillBoardDto.walletAddress,
                    GeoX: createBillBoardDto.GeoX,
                    GeoY: createBillBoardDto.GeoY,
                },
            });
            return BillBoard;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const billBoards = await this.prisma.billBoard.findMany({
                select: {
                    id: true,
                    walletAddress: true,
                },
            });
            return billBoards;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
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
    async remove(id) {
        return this.prisma.billBoard.delete({ where: { id } });
    }
};
exports.BillBoardService = BillBoardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillBoardService);
//# sourceMappingURL=bill-board.service.js.map