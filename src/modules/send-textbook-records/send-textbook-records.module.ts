import { Module } from '@nestjs/common';
import { SendTextbookRecordsService } from './send-textbook-records.service';
import { SendTextbookRecordsController } from './send-textbook-records.controller';
import sendTextbookRecords from '@/models/send-textbook-records.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([sendTextbookRecords])],
  controllers: [SendTextbookRecordsController],
  providers: [SendTextbookRecordsService],
})
export class SendTextbookRecordsModule {}
