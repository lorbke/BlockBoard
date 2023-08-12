import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { CompanyService } from 'src/company/company.service';
import { CompanyModule } from 'src/company/company.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';



@Module({
     controllers: [AuthController],
     providers:[AuthService, PrismaService,JwtStrategy,CompanyService],
     imports:[
          CompanyModule,
          PassportModule,
          PrismaModule,
          JwtModule.register({
               secret: process.env.JWT_SECRET,
               signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN
               }
          })
     ]
})
export class AuthModule{}