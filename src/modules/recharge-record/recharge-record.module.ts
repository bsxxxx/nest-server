import { Module } from '@nestjs/common';
import { RechargeRecordService } from './recharge-record.service';
import { RechargeRecordController } from './recharge-record.controller';
import RechargeRecords from '@/models/recharge-record.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([RechargeRecords]),],
  controllers: [RechargeRecordController],
  providers: [RechargeRecordService],
})
export class RechargeRecordModule { }
