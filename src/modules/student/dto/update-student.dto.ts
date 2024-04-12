import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateStudentDto) {
    @ApiProperty({ example: 1, description: '用户ID' })
    id: number;
}
