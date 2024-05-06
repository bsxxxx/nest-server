import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SendTextbookRecordsService } from './send-textbook-records.service';
import { CreateSendTextbookRecordDto } from './dto/create-send-textbook-record.dto';
import { UpdateSendTextbookRecordDto } from './dto/update-send-textbook-record.dto';

@Controller('send-textbook-records')
export class SendTextbookRecordsController {
  constructor(
    private readonly sendTextbookRecordsService: SendTextbookRecordsService,
  ) {}

  @Post()
  create(@Body() createSendTextbookRecordDto: CreateSendTextbookRecordDto) {
    return this.sendTextbookRecordsService.create(createSendTextbookRecordDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.sendTextbookRecordsService.findAll(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSendTextbookRecordDto: UpdateSendTextbookRecordDto,
  ) {
    return this.sendTextbookRecordsService.update(
      +id,
      updateSendTextbookRecordDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sendTextbookRecordsService.remove(+id);
  }
}
