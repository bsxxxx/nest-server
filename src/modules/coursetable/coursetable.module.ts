
import { Module } from '@nestjs/common';
import { CoursetableController } from './coursetable.controller'; // Files Controller
import { coursetableService } from './coursetable.service'; // Files Service
import Coursetable from '@/models/coursetable.model';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [
    SequelizeModule.forFeature([Coursetable]),
  ],
  controllers: [CoursetableController],
  providers: [coursetableService],
})
export class CoursetableModule { }
