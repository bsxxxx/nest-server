import { ApiProperty } from '@nestjs/swagger';

export class CoursetableDto {
  @ApiProperty({
    type: String,
    description: '课程id',
    default: '1',
    required: false,
  })
  id?: string;
  @ApiProperty({
    type: String,
    description: '课程名称',
    default: '英语',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '课程状态',
    default: '1',
    required: false,
  })
  status?: string;
  @ApiProperty({
    type: String,
    default: '1',
    description:
      '表示时间段的整数列，可以使用 1 到 12 的数字来表示每天的不同时间段',
  })
  time_slot?: number;
  @ApiProperty({
    type: String,
    default: '1',
    description: '学生id',
  })
  student_id?: string;
  @ApiProperty({
    type: String,
    default: '1',
    description: '教师id',
  })
  teacher_id?: string;
  @ApiProperty({
    type: Date,
    default: '2024/3/20',
    description: '上课日期',
  })
  date?: string;
}
export class QueryCoursetableDto {
  @ApiProperty({
    type: String,
    default: '1',
    description: '教师id',
  })
  teacher_id?: number;
  @ApiProperty({
    type: String,
    default: '0',
    description: '状态',
  })
  status?: number;
  @ApiProperty({
    type: String,
    default: '1',
    description: '学生id',
  })
  student_id?: number;
  @ApiProperty({
    type: Date,
    default: "['2024/3/20','2024/4/20']",
    description: '查询日期',
  })
  dateArr?: Date[];
}
