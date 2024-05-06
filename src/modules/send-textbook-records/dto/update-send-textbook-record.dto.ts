import { PartialType } from '@nestjs/mapped-types';
import { CreateSendTextbookRecordDto } from './create-send-textbook-record.dto';

export class UpdateSendTextbookRecordDto extends PartialType(CreateSendTextbookRecordDto) {}
