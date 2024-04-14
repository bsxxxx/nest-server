import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';
import Sell from '@/models/sell.model';
import { InjectModel } from '@nestjs/sequelize';
import { responseMessage } from '@/utils';
@Injectable()
export class SellService {
  constructor(
    @InjectModel(Sell)
    private readonly sellModel: typeof Sell
  ) { }
  async create(createSellDto: CreateSellDto) {
    const { name } = createSellDto;
    const [result, created] = await this.sellModel.findOrCreate({
      where: { name },
      // 如果不存在则插入数据
      defaults: {
        ...createSellDto,
      },
    });
    // 判断是否创建
    if (created) {
      return responseMessage(result);
    } else {
      throw new BadRequestException("用户名已存在！")
    }
  }
  update(id, updateSellDto: UpdateSellDto) {

    return this.sellModel.update(updateSellDto, { where: { id } })
  }

  async findAll() {
    const data = await this.sellModel.findAll();
    return responseMessage(data)
  }
  remove(id: number) {
    return this.sellModel.destroy({ where: { id } });
  }
}
