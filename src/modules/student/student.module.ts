import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import Student from '@/models/student.model';
import { SequelizeModule } from '@nestjs/sequelize';
// import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    SequelizeModule.forFeature([Student]),
    // MulterModule.register({
    //   dest: './upload', // 设置上传文件的目标目录
    // }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule { }
