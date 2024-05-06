import { Injectable } from '@nestjs/common';
import {
  CreateRechargeRecordDto,
  updateRechargeRecordDto,
} from './dto/recharge-record.dto';
import RechargeRecords from '@/models/recharge-record.model';
import { WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class RechargeRecordService {
  constructor(
    @InjectModel(RechargeRecords)
    private readonly rechargeRecords: typeof RechargeRecords,
  ) {}
  create(createRechargeRecordDto: CreateRechargeRecordDto) {
    return this.rechargeRecords.create({ ...createRechargeRecordDto });
  }

  findAll(params) {
    const { student_id } = params;
    const where: WhereOptions = {};
    if (student_id) {
      where.student_id = student_id;
    }
    return this.rechargeRecords.findAll({
      where,
      include: [{ association: 'student' }],
    });
  }

  remove(id: number) {
    return this.rechargeRecords.destroy({ where: { id } });
  }
  update(id, updateSellDto: updateRechargeRecordDto) {
    return this.rechargeRecords.update(updateSellDto, { where: { id } });
  }
}
