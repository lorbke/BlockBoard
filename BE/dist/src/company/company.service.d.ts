import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from '@prisma/client';
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    createer(createCompanyDto: CreateCompanyDto): string;
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
    }>;
}
