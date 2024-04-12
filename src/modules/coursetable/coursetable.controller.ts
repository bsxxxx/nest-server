import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { coursetableService, } from '../coursetable/coursetable.service';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  PickType,
} from '@nestjs/swagger'; // swagger 接口文档

import { responseMessage } from '@/utils';
import { CoursetableDto, QueryCoursetableDto } from './dto';
@ApiTags('课表')
@Controller()
export class CoursetableController {
  constructor(private coursetalbeService: coursetableService) {

  }
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOperation({ summary: '获取课表', })

  @Get('course-table')
  async getCoursetable(@Query() params: QueryCoursetableDto) {
    const data = await this.coursetalbeService.getCoursetable(params)
    return responseMessage(data)
  }
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOperation({ summary: '课表编辑' })
  @Post('course-table-edit')
  async editCoursetable(@Body() body: CoursetableDto) {
    await this.coursetalbeService.editCoursetable(body)
    return { meg: "编辑成功" }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOperation({ summary: '同步课程' })
  @Post('course-table-sync')
  async syncCourseableToNextWeek() {
    await this.coursetalbeService.syncCourseableToNextWeek()
    return { meg: "同步成功" }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOperation({ summary: '删除课程' })
  @Delete('course-table-delete')
  @ApiBody({
    description: '课程id',
    type: PickType(CoursetableDto, ['id']), // 请求体的类型
  })
  async remove(@Body('id') id: string) {
    await this.coursetalbeService.remove(+id);
    return { msg: "删除成功" }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOperation({ summary: '删除下周所有' })
  @Delete('course-table-delete-week')
  async deleteRecordsFromNextWeek() {
    await this.coursetalbeService.deleteRecordsFromNextWeek()
    return { msg: "删除成功" }
  }
}


