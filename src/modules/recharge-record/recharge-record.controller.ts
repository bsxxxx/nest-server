import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RechargeRecordService } from './recharge-record.service';
import { CreateRechargeRecordDto } from './dto/create-recharge-record.dto';
import { responseMessage } from '@/utils';
import { Roles } from '../auth/roles';
import { Role } from '@/utils/enums';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@ApiTags('充值记录')
@Roles(Role.ORGADM, Role.CLERK, Role.COURSE_CONSULTANT, Role.LEARNING_CONSULTANT)
@Controller('recharge-record')
export class RechargeRecordController {
  constructor(private readonly rechargeRecordService: RechargeRecordService) { }

  @Post()
  create(@Body() createRechargeRecordDto: CreateRechargeRecordDto) {
    return this.rechargeRecordService.create(createRechargeRecordDto);
  }

  @Get()
  async findAll(@Query() query) {
    const data = await this.rechargeRecordService.findAll(query);
    return responseMessage(data)
  }
}
