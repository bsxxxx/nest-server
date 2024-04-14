import { Module } from '@nestjs/common';
import { SellStudentService } from './sell-student.service';
import { SellStudentController } from './sell-student.controller';
import SellStudent from '@/models/sell-student.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([SellStudent])],
  controllers: [SellStudentController],
  providers: [SellStudentService],
})
export class SellStudentModule { }
