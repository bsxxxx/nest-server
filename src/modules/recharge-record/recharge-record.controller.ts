import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { RechargeRecordService } from './recharge-record.service';
import {
  CreateRechargeRecordDto,
  updateRechargeRecordDto,
} from './dto/recharge-record.dto';
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
@Roles(
  Role.ORGADM,
  Role.CLERK,
  Role.COURSE_CONSULTANT,
  Role.LEARNING_CONSULTANT,
)
@Controller('recharge-record')
export class RechargeRecordController {
  constructor(private readonly rechargeRecordService: RechargeRecordService) {}

  @Post()
  create(@Body() createRechargeRecordDto: CreateRechargeRecordDto) {
    return this.rechargeRecordService.create(createRechargeRecordDto);
  }

  @Get()
  async findAll(@Query() query) {
    const data = await this.rechargeRecordService.findAll(query);
    return responseMessage(data);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.rechargeRecordService.remove(+id);
    return { msg: '删除成功' };
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSellStudentDto: updateRechargeRecordDto,
  ) {
    return this.rechargeRecordService.update(+id, updateSellStudentDto);
  }
}
