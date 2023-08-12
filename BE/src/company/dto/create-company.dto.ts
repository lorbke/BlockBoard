import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  privateKey: string;

  @ApiProperty({ required: true })
  publicKey: string;
}
