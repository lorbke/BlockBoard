import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  createer(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }
  public async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const BillBoard = await this.prisma.company.create({
        data: {
          name: createCompanyDto.name,
          privateKey: createCompanyDto.privateKey,
        },
      });

      return BillBoard;
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const companies = await this.prisma.company.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return companies;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        privateKey: true,
      },
    });
  }

  public async remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }
}
