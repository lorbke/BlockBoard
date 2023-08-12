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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CompanyService = exports.CompanyService = class CompanyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCompanyDto) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const companies = await this.prisma.company.findMany({
                select: {
                    id: true,
                    username: true,
                },
            });
            return companies;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
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
    async remove(id) {
        return this.prisma.company.delete({ where: { id } });
    }
    async update(id, updateCompanyDto) {
        try {
            const User = await this.prisma.company.update({
                where: { id: id },
                data: { username: updateCompanyDto.username },
            });
            return User;
        }
        catch (error) {
            throw error;
        }
    }
    async updateCompanyBalance(id, balance) {
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
        }
        catch (error) { }
    }
};
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=company.service.js.map