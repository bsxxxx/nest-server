import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePassword } from './dto/update-user.dto';
import type { WhereOptions } from 'sequelize/types';
import { responseMessage } from '@/utils';
import User from '@/models/user.model';
import { Role } from '@/utils/enums';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class UserService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { name } = createUserDto;
    const [result, created] = await this.userModel.findOrCreate({
      where: { name },
      // 如果不存在则插入数据
      defaults: {
        ...createUserDto,
      },
    });
    // 判断是否创建
    if (created) {
      // 保存操作日志
      return responseMessage(result);
    } else {
      throw new BadRequestException('用户名已存在！');
    }
  }
  findAll(role?: string) {
    let where: any = {};
    if (role) {
      where.role = role;
    }
    if (role === Role.TEACHER) {
      return this.userModel.findAll({
        where,
        attributes: {
          exclude: [
            'password',
            'bank_account_number',
            'id_card_number',
            'deposit_bank',
          ],
        },
      });
    }
    return this.userModel.findAll({
      where,
      attributes: { exclude: ['password'] },
    });
  }
  findOne(id: string) {
    const where: WhereOptions = { id };
    return this.userModel.findOne({
      where,
      attributes: { exclude: ['password'] },
    });
  }
  getTeacherDetail(id: string) {
    const where: WhereOptions = { id };
    return this.userModel.findOne({
      where,
      attributes: {
        exclude: [
          'password',
          'bank_account_number',
          'id_card_number',
          'deposit_bank',
        ],
      },
    });
  }
  getUseInfo() {
    return this.userModel.findAll({
      attributes: {
        exclude: [
          'password',
          'bank_account_number',
          'id_card_number',
          'deposit_bank',
        ],
      },
    });
  }
  getUserCount() {
    return this.userModel.findAll({
      attributes: [
        [Sequelize.literal('DATE(created_time)'), 'registration_date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'registration_count'],
      ],
      group: [Sequelize.literal('DATE(created_time)') as any],
    });
  }

  update(updateUserDto: UpdateUserDto) {
    const { id } = updateUserDto;
    return this.userModel.update(updateUserDto, { where: { id } });
  }
  async changePassword(id: String, updatePassword: UpdatePassword) {
    const { oldPassword, newPassword } = updatePassword;
    const [num] = await this.userModel.update(
      { password: newPassword },
      { where: { id, password: oldPassword } },
    );
    if (num == 0) {
      throw new BadRequestException('密码错误');
    }
    return responseMessage('修改成功');
  }

  remove(id: string) {
    return this.userModel.destroy({ where: { id } });
  }
}
