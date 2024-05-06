import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import Salary from '@/models/salary.model';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { exportToExcel } from '@/utils';
import { Op } from 'sequelize';
// import User from '@/models/user.model';
@Injectable()
export class SalaryService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(Salary)
    private readonly salaryModel: typeof Salary,
  ) {}
  create(createSalaryDto: CreateSalaryDto) {
    return this.salaryModel.create({ ...createSalaryDto });
  }

  findAll(query) {
    const { user_id, date } = query;

    const where: WhereOptions = {};
    if (user_id) {
      where.user_id = user_id;
    }
    if (date) {
      where.start_date = {
        [Op.startsWith]: date,
      };
    }

    return this.salaryModel.findAll({
      where,
      // include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }]
      /**使用 association: 别名    代替使用model 导入 数据库实体 */
      include: [{ association: 'user', attributes: { exclude: ['password'] } }],
    });
  }

  remove(id: string) {
    this.salaryModel.destroy({ where: { id } });
  }

  update(id, updateSalary: CreateSalaryDto) {
    return this.salaryModel.update(updateSalary, { where: { id } });
  }

  async export(query) {
    const data = await this.findAll(query);
    const roleMap = {
      orgadm: '管理员',
      clerk: '文员',
      course_consultant: '课程顾问',
      learning_consultant: '学习顾问',
    };
    const genderMap = {
      male: '男',
      female: '女',
    };
    const filterData = data.map(({ dataValues }) => {
      const {
        user: {
          phone,
          chinese_name,
          employment_date,
          deposit_bank,
          english_name,
          role,
          gender,
          id_card_number,
          bank_account_number,
        } = {} as any,
        commission_rate,
        basic_salary,
        start_date,
        end_date,
        class_hour,
        gross_amount,
        reward,
        penalty,
        total_amount,
      } = dataValues;
      return {
        中文名称: chinese_name,
        英文名称: english_name,
        角色: roleMap[role] || role,
        性别: genderMap[gender] || gender,
        手机号: phone,
        身份证号: id_card_number,
        开户行: deposit_bank,
        银行卡: bank_account_number,
        入职日期: employment_date,
        工资结算日期: `${start_date}~${end_date}`,
        '课单价（基本工资）': basic_salary,
        课时数: class_hour,
        应发金额: gross_amount,
        奖励: reward,
        罚款: penalty,
        总金额: total_amount,
      };
    });

    return exportToExcel(filterData);
  }
}
