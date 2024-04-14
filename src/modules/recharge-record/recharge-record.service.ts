import { Injectable } from '@nestjs/common';
import { CreateRechargeRecordDto } from './dto/create-recharge-record.dto';
import RechargeRecords from '@/models/recharge-record.model';
import { WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class RechargeRecordService {
  constructor(
    @InjectModel(RechargeRecords)
    private readonly rechargeRecords: typeof RechargeRecords
  ) { }
  create(createRechargeRecordDto: CreateRechargeRecordDto) {
    return this.rechargeRecords.create({ ...createRechargeRecordDto })
  }

  findAll(params) {
    const { student_id } = params
    const where: WhereOptions = {}
    if (student_id) {
      where.student_id = student_id
    }
    return this.rechargeRecords.findAll({
      where,
      include: [
        { association: 'student' },
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} rechargeRecord`;
  }


  remove(id: number) {
    return `This action removes a #${id} rechargeRecord`;
  }
}
