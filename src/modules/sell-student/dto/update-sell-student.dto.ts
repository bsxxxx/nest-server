import { PartialType } from '@nestjs/mapped-types';
import { CreateSellStudentDto } from './create-sell-student.dto';

export class UpdateSellStudentDto extends PartialType(CreateSellStudentDto) {}
