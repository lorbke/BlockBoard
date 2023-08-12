import { ApiProperty } from '@nestjs/swagger';

export class CreateBillBoardDto {
  @ApiProperty({ required: true })
  walletAddress: string;

  @ApiProperty({ required: true })
  GeoX: string;

  @ApiProperty({ required: true })
  GeoY: string;
}
