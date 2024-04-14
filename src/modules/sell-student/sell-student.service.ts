
import SellStudent from '@/models/sell-student.model';
import { responseMessage } from '@/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize';
import { CreateSellStudentDto } from './dto/create-sell-student.dto';
import { UpdateSellStudentDto } from './dto/update-sell-student.dto';
@Injectable()
export class SellStudentService {
  constructor(
    @InjectModel(SellStudent)
    private readonly sellStudent: typeof SellStudent
  ) { }
  async create(createSellStudentDto: CreateSellStudentDto) {
    await this.sellStudent.create({ ...createSellStudentDto })
    return responseMessage("创建成功")
  }

  async findAll(query) {
    const where = query
    const data = await this.sellStudent.findAll({ where });
    return responseMessage(data)
  }

  //业绩指标
  async getPerformance(query) {
    const { date } = query;
    console.log(date, 'date');

    const where: WhereOptions = {};
    where.date = {
      [Op.startsWith]: date
    };
    const data = await this.sellStudent.findAll({
      where,
      include: [{
        association: 'sell'
      }],
      attributes: [
        'salespersonId',
        [Sequelize.fn('COUNT', Sequelize.col('SellStudent.id')), 'count'],
        [Sequelize.fn('SUM', Sequelize.col('SellStudent.trial_class_count')), 'trial_class_count_sum'],
        [Sequelize.fn('SUM', Sequelize.col('SellStudent.trial_class_scheduling_test')), 'trial_class_scheduling_test_sum'],
        [Sequelize.fn('SUM', Sequelize.col('SellStudent.formal_class_test')), 'formal_class_test_sum'],
        [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN SellStudent.course_category = 1 THEN total_lessons ELSE 0 END')), 'omTotalLessonsSum'],
        [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN SellStudent.course_category = 1 THEN total_amount ELSE 0 END')), 'omTotalAmountSum'],
        [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN SellStudent.course_category = 2 THEN total_lessons ELSE 0 END')), 'fTotalLessonsSum'],
        [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN SellStudent.course_category = 2 THEN total_amount ELSE 0 END')), 'fTotalAmountSum'],
        [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN SellStudent.course_category = 3 THEN total_lessons ELSE 0 END')), 'zTotalLessonsSum'],
        [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN SellStudent.course_category = 3 THEN total_amount ELSE 0 END')), 'zTotalAmountSum']
      ],
      group: ['salespersonId'],
    });

    return responseMessage(data);

  }

  findOne(id: number) {
    return `This action returns a #${id} sellStudent`;
  }

  async update(id: number, updateSellStudentDto: UpdateSellStudentDto) {
    await this.sellStudent.update(updateSellStudentDto, { where: { id } })
    return responseMessage("更新成功")
  }

  async remove(id: number) {
    await this.sellStudent.destroy({ where: { id } })
    return responseMessage("删除成功")
  }
}
