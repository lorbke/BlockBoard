import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
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
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        privateKey: string;
        publicKey: string;
    }>;
}
