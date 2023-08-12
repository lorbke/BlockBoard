import { PartialType } from '@nestjs/mapped-types';
import { CreateBillBoardDto } from './create-bill-board.dto';

export class UpdateBillBoardDto extends PartialType(CreateBillBoardDto) {}
