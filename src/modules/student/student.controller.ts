import { Controller, Get, Post, Body, Delete, Query, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateUserDto } from './dto/update-student.dto';
import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlink } from 'fs/promises';
import { Roles } from '../auth/roles';
import { Role } from '@/utils/enums';
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiTags('学生表')
@ApiBearerAuth()
@Roles(Role.ORGADM, Role.CLERK, Role.COURSE_CONSULTANT, Role.LEARNING_CONSULTANT)
@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('student-create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('student-list')
  async findAll(@Query() query) {
    const data = await this.studentService.findAll(query);
    return { data }
  }

  @Get('student-detail')
  findOne(@Query('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Post('student-edit')
  async update(@Body() updateUserDto: UpdateUserDto) {
    const [status] = await this.studentService.update(updateUserDto);
    if (status == 1) {
      return { msg: "编辑成功" }
    }
    return { msg: "编辑失败" };
  }
  @Post('bind')
  async bindTeacher(@Body() updateUserDto: UpdateUserDto) {
    const [status] = await this.studentService.update(updateUserDto);
    if (status == 1) {
      return { msg: "编辑成功" }
    }
    return { msg: "编辑失败" };
  }

  @Delete('student-delete')
  remove(@Body('id') id: string | string[]) {
    return this.studentService.remove(id);
  }
  @Get('student-bind-list')
  @Roles(Role.ORGADM, Role.CLERK, Role.COURSE_CONSULTANT, Role.LEARNING_CONSULTANT, Role.TEACHER)
  async getBindToTeacherList(@Query('id') teacher_id: string) {
    const data = await this.studentService.findAll({ teacher_id });
    return { data, code: 200 }
  }
  @Get('student-export')
  async exportStudent(@Res() res) {
    const { buffer, filename, mimeType }: any = await this.studentService.export()
    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }
  @Post('students/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({ destination: './upload' }),
    })
  )
  async importStudent(@UploadedFile() file) {
    await this.studentService.parseData(file)
    unlink(file.path)
    // 批量插入数据库操作...
    return { msg: "导入成功" }
  }
}
