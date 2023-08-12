import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
        balance: number;
    }>;
}
