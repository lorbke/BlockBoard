import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  privateKey: string;

  @ApiProperty({ required: true })
  publicKey: string;

  @ApiProperty({ required: true})
  password: string;
}
