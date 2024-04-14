import { Injectable, BadRequestException } from '@nestjs/common';
import { exportToExcel, convertBufferToJson } from '@/utils';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateUserDto } from './dto/update-student.dto';
import { WhereOptions } from 'sequelize/types';
import { responseMessage } from '@/utils';
import Student from '@/models/student.model';
import { Op, literal } from 'sequelize';
@Injectable()
export class StudentService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(Student)
    private readonly studentModel: typeof Student
  ) { }
  async create(createUserDto: CreateStudentDto) {
    const { chinese_name } = createUserDto;
    const [result, created] = await this.studentModel.findOrCreate({
      where: { chinese_name },
      // 如果不存在则插入数据
      defaults: {
        ...createUserDto,
      },
    });
    // 判断是否创建
    if (created) {
      return responseMessage(result);
    } else {
      throw new BadRequestException("用户名已存在！")
    }
  }
  async findAll(query) {
    const { name, notes, teacher_id } = query;
    const where: any = {
    }
    if (name) {
      where[Op.or] = [
        {
          chinese_name: {
            [Op.like]: `%${name}%`
          }
        },
        {
          english_name: {
            [Op.like]: `%${name}%`
          }
        },

      ]
    }
    if (notes) {
      // 正式课和体验课
      if (notes == "1" || notes == "2") {
        where.notes = notes;
      }

    }
    if (teacher_id) {
      where.teacher_id = teacher_id
    }
    const data = await this.studentModel.findAll({
      where,
      // include: [{
      //   association: 'course'
      // }],
      attributes: {
        include: [
          /** 课程状态为1或者3 表示已上课 */
          [literal(`COALESCE(total_hours, 0) - (SELECT COUNT(*) FROM coursetable WHERE student_id = Student.id AND status IN (1, 3))`), 'remaining_class_hours'],
          [
            literal(`(SELECT COUNT(*) FROM recharge_records WHERE student_id = Student.id)`),
            'recharge_record'
          ]
        ],
      },
    })
    return data
  }
  findOne(id: string) {
    const where: WhereOptions = { id }
    return this.studentModel.findOne({ where })
  }

  update(updateUserDto: UpdateUserDto) {
    const { id } = updateUserDto
    return this.studentModel.update(updateUserDto, { where: { id } })
  }

  remove(id: string | string[]) {
    return this.studentModel.destroy({ where: { id } })
  }
  async export() {
    const data = await this.findAll({})
    const noteMap = {
      1: "体验课",
      2: "正式课"
    }
    const filterData = data.map(({ dataValues }) => {
      const {
        phone, chinese_name, english_name, gender, age, grade, student_bg,
        channel, recharge_record, purchase_date, course_category,
        total_hours, course_unit_price, total_amount, textbook, mail, settlement_date, notes
        , remaining_class_hours
      } = dataValues
      return {
        "手机号": phone,
        "中文名称": chinese_name,
        "英文名称": english_name,
        "性别": gender,
        "年龄": age,
        "就读年级": grade,
        "基本信息（学习目标）": student_bg,
        "获课来源": channel,
        "充值记录": recharge_record,
        "购买日期": purchase_date,
        "课程类别": course_category,
        "总课时": total_hours,
        "课程单价": course_unit_price,
        "总金额": total_amount,
        "教材名称": textbook,
        "收件地址": mail,
        "结算日期": settlement_date,
        "标签": noteMap[notes],
        "剩余课时结算": remaining_class_hours
      }
    })

    return exportToExcel(filterData)
  }
  async parseData(file) {
    try {
      const data: any[] = await convertBufferToJson(file)
      const nameMap = {
        '手机号': 'phone',
        '中文名称': 'chinese_name',
        '英文名称': 'english_name',
        '性别': 'gender',
        '年龄': 'age',
        '就读年级': 'grade',
        '基本信息（学习目标）': 'student_bg',
        '获课来源': 'channel',
        '购买日期': 'purchase_date',
        '课程类别': 'course_category',
        '总课时': 'total_hours',
        '课程单价': 'course_unit_price',
        '总金额': 'total_amount',
        '教材名称': 'textbook',
        '收件地址': 'mail',
        '结算日期': 'settlement_date',
        '标签': 'notes',
        '剩余课时结算': 'remaining_class_hours'
      }
      const noteMap = {
        "体验课": '1',
        "正式课": "2"
      }
      const filterData = data.map(item => {
        let obj = {}
        for (const key in item) {
          const nameMapKey = nameMap[key]
          if (nameMapKey) {
            if (nameMapKey == 'notes') {
              obj[nameMapKey] = noteMap[item[key]]
            } else {
              obj[nameMapKey] = item[key]
            }

          }
        }
        return obj
      })
      const res = await this.studentModel.bulkCreate(filterData);
      return res
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('中文名称重复')
      } else {
        // 处理其他错误
        throw error;
      }


    }

  }
}
