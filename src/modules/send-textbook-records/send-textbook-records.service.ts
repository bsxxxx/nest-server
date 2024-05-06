import { Injectable } from '@nestjs/common';
import { CreateSendTextbookRecordDto } from './dto/create-send-textbook-record.dto';
import { UpdateSendTextbookRecordDto } from './dto/update-send-textbook-record.dto';
import SendTextbookRecords from '@/models/send-textbook-records.model';
import { responseMessage } from '@/utils';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
@Injectable()
export class SendTextbookRecordsService {
  constructor(
    @InjectModel(SendTextbookRecords)
    private readonly sendTextbookRecords: typeof SendTextbookRecords,
  ) {}
  async create(createSendTextbookRecordDto: CreateSendTextbookRecordDto) {
    await this.sendTextbookRecords.create({ ...createSendTextbookRecordDto });
    return responseMessage('创建成功');
  }

  async findAll(params) {
    const { student_id } = params;
    const where: WhereOptions = {};
    if (student_id) {
      where.student_id = student_id;
    }
    const data = await this.sendTextbookRecords.findAll({
      where,
      include: [{ association: 'student' }],
    });
    return responseMessage(data);
  }

  async remove(id: number) {
    await this.sendTextbookRecords.destroy({ where: { id } });
    return responseMessage('删除成功');
  }
  async update(id, updateSellDto: UpdateSendTextbookRecordDto) {
    const data = await this.sendTextbookRecords.update(updateSellDto, {
      where: { id },
    });
    return responseMessage(data);
  }
}
