import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BlockchainInterfaceService } from './blockchain-interface.service';
import { RentBillboardDto } from './dto/renter-billboard.dto';

@Controller('blockchain')
export class BlockchainInterfaceController {
  constructor(private readonly blockchainService: BlockchainInterfaceService) {}

  @Get('ad/:billboardId')
  async getAd(@Param('billboardId') billboardId: number): Promise<string> {
    return this.blockchainService.getAd(billboardId);
  }

  @Post('register')
  async registerBillboard(@Body() body: any): Promise<void> {
    const { geo_lat, geo_long } = body;
    return this.blockchainService.registerBillboard(geo_lat, geo_long);
  }

  // @Post('rentbillboard')
  // async rentBillboard(@Body() body: any): Promise<void> {
  //   const { ad_url, billboard_token_id, cost_per_block } = body;
  //   return this.blockchainService.rentBillboard(ad_url, billboard_token_id, cost_per_block);
  // }

  @Post('rentbillboard')
  async rentBillboard(@Body() rentBillboardDto: RentBillboardDto): Promise<void> {
    const { ad_url, billboard_token_id, cost_per_block } = rentBillboardDto;
    return this.blockchainService.rentBillboard(ad_url, billboard_token_id, cost_per_block);
  }

  @Post('killrenter')
  async killRenter(@Body() body: any): Promise<any> {
    const { renterAddress } = body
    return this.blockchainService.killRenter(renterAddress);
  }

  @Post('unstake')
  async unstakeRent(): Promise<any> {
    return this.blockchainService.unstakeRent();
  }
}
