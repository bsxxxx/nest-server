import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import Bonus from '@/models/bonus.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([Bonus])],
  controllers: [BonusController],
  providers: [BonusService],
})
export class BonusModule {}
