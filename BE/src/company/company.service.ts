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
          publicKey: createCompanyDto.publicKey
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
        publicKey: true,
        balance: true,
      },
    });
  }

  public async remove(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }

  public async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const User = await this.prisma.company.update({
        where: { id: id},
        data: { name: updateCompanyDto.name },
      });

      return User;
    } catch (error) {
      throw error;
    }
  }

  async updateCompanyBalance(id: string, balance: number) {
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
    } catch (error) {}
  }

  // public async  getBalance(id: string) {
  //   return this.prisma.company.findUnique({
  //     where: { id },
  //     select: {
  //       balance: true
  //     },
  //   });
  // }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }
}
