import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillBoardService } from './bill-board.service';
import { CreateBillBoardDto } from './dto/create-bill-board.dto';
import { UpdateBillBoardDto } from './dto/update-bill-board.dto';

@Controller('bill-board')
export class BillBoardController {
  constructor(private readonly billBoardService: BillBoardService) {}

  @Post()
  create(@Body() createBillBoardDto: CreateBillBoardDto) {
    return this.billBoardService.create(createBillBoardDto);
  }

  // @Get()
  // findAll() {
  //   return this.billBoardService.findAll();
  // }

  @Get()
  findAllBillBoard() {
    return this.billBoardService.findAllBillBoard();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billBoardService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billBoardService.remove(id);
  }
}
