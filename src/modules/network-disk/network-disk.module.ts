import { Module } from '@nestjs/common';
import { NetworkDiskService } from './network-disk.service';
import { NetworkDiskController } from './network-disk.controller';
import NetworkDisk from '@/models/networkdisk.model';
import { SequelizeModule } from '@nestjs/sequelize'
@Module({
  imports: [
    SequelizeModule.forFeature([NetworkDisk])
  ],
  controllers: [NetworkDiskController],
  providers: [NetworkDiskService],
})
export class NetworkDiskModule { }
