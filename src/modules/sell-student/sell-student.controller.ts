import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SellStudentService } from './sell-student.service';
import { CreateSellStudentDto } from './dto/create-sell-student.dto';
import { UpdateSellStudentDto } from './dto/update-sell-student.dto';
import { QuerySellStudentDto } from './dto/query-sell-student.dto';
import { Public } from '@/utils';

@Controller('sell-student')
export class SellStudentController {
  constructor(private readonly sellStudentService: SellStudentService) { }

  @Post()
  create(@Body() createSellStudentDto: CreateSellStudentDto) {
    return this.sellStudentService.create(createSellStudentDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.sellStudentService.findAll(query);
  }
  @Get('group')
  @Public()
  getPerformance(@Query() query: QuerySellStudentDto) {
    return this.sellStudentService.getPerformance(query);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellStudentDto: UpdateSellStudentDto) {
    return this.sellStudentService.update(+id, updateSellStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellStudentService.remove(+id);
  }
}
