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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const company_service_1 = require("../company/company.service");
const bcrypt = require("bcrypt");
const company_model_1 = require("../company/company.model");
const ethers_1 = require("ethers");
let AuthService = exports.AuthService = class AuthService {
    constructor(prismaService, jwtService, CompanyService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.CompanyService = CompanyService;
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const company = await this.prismaService.company.findUnique({
            where: { username }
        });
        if (!company) {
            throw new common_1.NotFoundException('user not found');
        }
        const validatePassword = await bcrypt.compare(password, company.password);
        if (!validatePassword) {
            throw new common_1.NotFoundException('Invalid password');
        }
        return {
            token: this.jwtService.sign({ username })
        };
    }
    async register(createDto) {
        const wallet = ethers_1.Wallet.createRandom();
        const publicKey = wallet.address;
        const privateKey = wallet.privateKey;
        const createCompany = new company_model_1.Company();
        createCompany.username = createDto.username;
        createCompany.password = await bcrypt.hash(createDto.password, 10);
        createCompany.privateKey = privateKey;
        createCompany.publicKey = publicKey;
        const user = await this.CompanyService.create(createCompany);
        return {
            token: this.jwtService.sign({ username: user.username }),
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        company_service_1.CompanyService])
], AuthService);
//# sourceMappingURL=auth.service.js.map