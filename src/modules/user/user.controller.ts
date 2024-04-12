import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePassword } from './dto/update-user.dto';
import { ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@/modules/auth/roles';
import { Role } from '@/utils/enums';
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller()
@Roles(Role.ORGADM, Role.CLERK, Role.COURSE_CONSULTANT, Role.LEARNING_CONSULTANT)
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('user-create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard('jwt'))// 已在全局添加


  @Get('user-list')
  async findAll() {
    const userList = await this.userService.findAll();
    return { userList }
  }


  @Get('teacher-list')
  async teacherList() {
    const data = await this.userService.findAll("teacher");
    return { data }
  }

  @Get('user-detail')
  findOne(@Query('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('user-edit')
  async update(@Body() updateUserDto: UpdateUserDto) {
    const [status] = await this.userService.update(updateUserDto);
    if (status == 1) {
      return { msg: "编辑成功" }
    }
    return { msg: "编辑失败" };
  }

  @Delete('user-delete')
  remove(@Body('id') id: string) {
    return this.userService.remove(id);
  }
  @Post('change-password/:id')
  changePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePassword) {
    return this.userService.changePassword(id, updatePasswordDto);
  }
}
