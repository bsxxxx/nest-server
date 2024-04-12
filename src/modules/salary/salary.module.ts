import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import Salary from '@/models/salary.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([Salary]),],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule { }
