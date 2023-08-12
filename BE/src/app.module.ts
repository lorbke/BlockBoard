import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillBoardModule } from './bill-board/bill-board.module';
import { CompanyModule } from './company/company.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BlockchainInterfaceModule } from './blockchain-interface/blockchain-interface.module';

@Module({
  imports: [BillBoardModule, CompanyModule, PrismaModule, AuthModule, BlockchainInterfaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
