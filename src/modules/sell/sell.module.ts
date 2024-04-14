import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import Sell from '@/models/sell.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([Sell])],
  controllers: [SellController],
  providers: [SellService],
})
export class SellModule { }
