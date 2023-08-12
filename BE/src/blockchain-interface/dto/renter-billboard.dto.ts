import { ApiProperty } from '@nestjs/swagger';

export class RentBillboardDto {
  @ApiProperty()
  ad_url: string;

  @ApiProperty()
  billboard_token_id: number;

  @ApiProperty()
  cost_per_block: number;
}