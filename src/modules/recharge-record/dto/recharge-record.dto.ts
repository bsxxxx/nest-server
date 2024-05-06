import { ApiProperty } from '@nestjs/swagger';
export class CreateRechargeRecordDto {
  @ApiProperty({
    description: '学生id',
    type: String,
    required: true,
  })
  student_id: string;

  @ApiProperty({
    description: '录入人员',
    type: String,
    required: true,
  })
  operation_name: string;

  @ApiProperty({
    description: '充值日期',
    type: String,
    required: true,
  })
  recharge_date: string;

  @ApiProperty({
    description: '课程类别',
    type: String,
    required: false,
  })
  course_category: string;

  @ApiProperty({
    description: '总课时',
    type: String,
    required: false,
  })
  total_hours: string;

  @ApiProperty({
    description: '课程单价',
    type: String,
    required: false,
  })
  course_unit_price: string;

  @ApiProperty({
    description: '总金额',
    type: String,
    required: false,
  })
  total_amount: string;

  @ApiProperty({
    description: '教材名称',
    type: String,
    required: false,
  })
  textbook: string;

  @ApiProperty({
    description: '邮箱地址',
    type: String,
    required: false,
  })
  mail: string;

  @ApiProperty({
    description: '结算日期',
    type: String,
    required: false,
  })
  settlement_date: string;

  @ApiProperty({
    description: '标签',
    type: String,
    required: false,
  })
  notes: string;
}
export class updateRechargeRecordDto {
  @ApiProperty({
    description: '教材名称',
    type: String,
    required: false,
  })
  textbook: string;

  @ApiProperty({
    description: '结算日期',
    type: String,
    required: false,
  })
  settlement_date: string;
}
