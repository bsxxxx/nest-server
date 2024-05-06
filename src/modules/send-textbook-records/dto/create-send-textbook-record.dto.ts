import { ApiProperty } from '@nestjs/swagger';

export class CreateSendTextbookRecordDto {
  @ApiProperty({ type: String, description: '学生id' })
  student_id: string;

  @ApiProperty({ type: String, description: '课程类别' })
  course_category: string;

  @ApiProperty({ type: String, description: '教材名称' })
  name: string;

  @ApiProperty({ type: String, description: '教材价格' })
  price: string;

  @ApiProperty({ type: String, description: '收件地址' })
  address: string;
}
