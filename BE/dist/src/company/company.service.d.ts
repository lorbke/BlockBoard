import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from '@prisma/client';
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    createCompany(data: Company): Promise<Company>;
    findAll(): Promise<{
        id: string;
        username: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        username: string;
        password: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        id: string;
        username: string;
        password: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
    updateCompanyBalance(id: string, balance: number): Promise<void>;
}
