import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyService } from "src/company/company.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from "./dto/register-user.dto";
import { Company } from "src/company/company.model";

@Injectable()
export class AuthService{

     constructor(
          private readonly prismaService: PrismaService,
          private jwtService: JwtService,
          private readonly CompanyService: CompanyService){}

     
     async login(loginDto: LoginDto):Promise<any>{
          const {username,password} = loginDto;

          const company =await this.prismaService.company.findUnique({
               where: {username}
          })

          if(!company){
               throw new NotFoundException('user not found')
          }

          const validatePassword = await bcrypt.compare(password,company.password)

          if(!validatePassword){
               throw new NotFoundException('Invalid password')
          }

          return {
               token: this.jwtService.sign({username})
          }
     }



     async register (createDto: RegisterUsersDto): Promise<any>{
          const createCompany = new Company();
          createCompany.username = createDto.username;
          createCompany.password = await bcrypt.hash(createDto.password, 10);
          createCompany.privateKey = createDto.privateKey;
          createCompany.publicKey = createDto.publicKey;

    const user = await this.CompanyService.create(createCompany);

    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }
     
}