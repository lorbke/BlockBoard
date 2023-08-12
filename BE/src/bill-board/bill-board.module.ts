import { Module } from '@nestjs/common';
import { BillBoardService } from './bill-board.service';
import { BillBoardController } from './bill-board.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BillBoardController],
  providers: [BillBoardService],
  imports: [PrismaModule],
})
export class BillBoardModule {}
