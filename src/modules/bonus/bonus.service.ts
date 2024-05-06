import { Injectable } from '@nestjs/common';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import Bonus from '@/models/bonus.model';
import { InjectModel } from '@nestjs/sequelize';
import { exportToExcel, responseMessage } from '@/utils';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
@Injectable()
export class BonusService {
  constructor(
    @InjectModel(Bonus)
    private readonly bonusModel: typeof Bonus,
  ) {}
  create(createBonusDto: CreateBonusDto) {
    return this.bonusModel.create({ ...createBonusDto });
  }

  async findAll(query: any) {
    const where: WhereOptions = {};
    const { start_date, end_date } = query;
    console.log(query, 'query================');

    if (start_date && end_date) {
      where.start_date = {
        [Op.gte]: start_date,
      };
      where.end_date = {
        [Op.lte]: end_date,
      };
    }
    const data = await this.bonusModel.findAll({
      where,
      include: [
        { association: 'student' },
        {
          association: 'user',
          attributes: {
            exclude: [
              'password',
              'bank_account_number',
              'id_card_number',
              'deposit_bank',
            ],
          },
        },
      ],
    });
    return responseMessage(data);
  }

  remove(id: number) {
    return this.bonusModel.destroy({ where: { id } });
  }
  update(id, updateSellDto: UpdateBonusDto) {
    return this.bonusModel.update(updateSellDto, { where: { id } });
  }

  async export(query) {
    const { data } = await this.findAll(query);
    const filterData = data.map(({ dataValues }) => {
      const {
        user: { english_name: user_name } = {} as any,
        student: { english_name: student_name } = {} as any,
        rewards,
        reward_quantity,
        amount,
        start_date,
        end_date,
      } = dataValues;
      return {
        日期: `${start_date}至${end_date}`,
        员工: user_name,
        学员姓名: student_name,
        奖项: rewards,
        奖励数量: reward_quantity,
        金额: amount,
      };
    });

    return exportToExcel(filterData);
  }
}
