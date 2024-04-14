import { Controller, Get, Post, Body, Param, Delete, Query, Res } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { responseMessage } from '@/utils';
import { Roles } from '../auth/roles';
import { Role } from '@/utils/enums';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
@Roles(Role.ORGADM)
@ApiTags('工资')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@Controller('salary/user')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }
  @ApiOperation({ summary: '创建工资表' })
  @Post()
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.create(createSalaryDto);
  }

  @ApiOperation({ summary: '获取工资表' })
  @Get()
  async findAll(@Query('user_id') user_id: string) {
    const data = await this.salaryService.findAll({ user_id });
    return responseMessage(data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryService.remove(id);
  }

  @Get('salary-excel')
  async exportSalary(@Res() res, @Query("id") user_id) {
    const { buffer, filename, mimeType }: any = await this.salaryService.export({ user_id })
    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }
}
