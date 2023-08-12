import { JwtService } from "@nestjs/jwt";
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from "src/company/company.service";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterUsersDto } from "./dto/register-user.dto";
export declare class AuthService {
    private readonly prismaService;
    private jwtService;
    private readonly CompanyService;
    constructor(prismaService: PrismaService, jwtService: JwtService, CompanyService: CompanyService);
    login(loginDto: LoginDto): Promise<any>;
    register(createDto: RegisterUsersDto): Promise<any>;
}
