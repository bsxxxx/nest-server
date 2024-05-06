import { ApiProperty } from '@nestjs/swagger';

/**
 * @description: 保存用户数据
 * @author:bi
 */

export class CreateStudentDto {
  @ApiProperty({
    type: String,
    description: '电话号码',
    default: 'test',
    required: false,
  })
  phone: string;
  @ApiProperty({
    type: String,
    description: '中文名',
    default: '张三',
    required: true,
  })
  chinese_name: string;
  @ApiProperty({
    type: String,
    description: '英文名',
    default: 'zhangsan',
    required: false,
  })
  english_name: string;
  @ApiProperty({
    type: String,
    description: '性别',
    default: 'male',
    required: false,
  })
  gender: string;
  @ApiProperty({
    type: String,
    description: '年龄',
    default: '10',
    required: false,
  })
  age: string;
  @ApiProperty({
    type: String,
    description: '就读年级',
    default: '一年级',
    required: false,
  })
  grade: string;
  @ApiProperty({
    type: String,
    description: '基本信息（学习目标）',
    default: 'xxxxx',
    required: false,
  })
  student_bg: string;
  @ApiProperty({
    type: String,
    description: '获客来源',
    default: 'test',
    required: false,
  })
  channel: string;
  @ApiProperty({
    type: String,
    description: '购买日期',
    default: '2022/3/19',
    required: false,
  })
  purchase_date: string;

  @ApiProperty({
    type: String,
    description: '收件地址',
    default: 'test',
    required: false,
  })
  mail: string;
  @ApiProperty({
    type: String,
    description: '结算日期',
    default: 'test',
    required: false,
  })
  settlement_date: string;
  @ApiProperty({
    type: String,
    description: '教师名称',
    default: 'test',
    required: false,
  })
  teacher_name: string;
  @ApiProperty({
    type: String,
    description: '教师id',
    default: 'test',
    required: false,
  })
  teacher_id: string;
  @ApiProperty({
    type: String,
    description: '销售姓名',
    default: 'test',
    required: false,
  })
  sales_person_name: string;
  @ApiProperty({
    type: String,
    description: '销售id',
    default: 'test',
    required: false,
  })
  sales_person_id: string;
  @ApiProperty({
    type: String,
    description: '标签',
    default: 'test',
    required: false,
  })
  notes: string;
  @ApiProperty({
    type: String,
    description: '剩余总课时',
    default: '20',
    required: false,
  })
  remaining_class_hours: string;
}
