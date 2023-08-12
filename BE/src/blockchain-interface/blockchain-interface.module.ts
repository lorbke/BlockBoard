import { Module } from '@nestjs/common';
import { BlockchainInterfaceController } from './blockchain-interface.controller';
import { BlockchainInterfaceService } from './blockchain-interface.service';

@Module({
  controllers: [BlockchainInterfaceController],
  providers: [BlockchainInterfaceService],
})
export class BlockchainInterfaceModule {}
