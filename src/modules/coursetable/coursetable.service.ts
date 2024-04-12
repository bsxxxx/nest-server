import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions, Transaction } from 'sequelize';
import Coursetable from '../../models/coursetable.model';
import { CoursetableDto, QueryCoursetableDto } from './dto';
@Injectable()
export class coursetableService {
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(Coursetable)
    private readonly coursetableModel: typeof Coursetable;

    getCoursetable(query: QueryCoursetableDto) {
        const { teacher_id, student_id, dateArr } = query;
        const where: WhereOptions = {
        }
        if (dateArr) {
            where.date = {
                [Op.gte]: dateArr[0],
                [Op.lte]: dateArr[1],
            }
        }
        if (student_id) {
            where.student_id = +student_id
        }
        if (teacher_id) {
            where.teacher_id = +teacher_id
        }
        return this.coursetableModel.findAll({
            where,
            include: [
                { association: 'user', attributes: ['name', 'chinese_name', 'english_name'] },
                { association: 'student', attributes: ['chinese_name', 'english_name'] },
            ],
        })
    }
    createCoursetable(coursetable: CoursetableDto) {
        return this.coursetableModel.create({ ...coursetable })
    }
    async syncCourseableToNextWeek(): Promise<void> {
        const where: WhereOptions = {
            [Op.and]: [
                this.coursetableModel.sequelize.literal('WEEK(date, 1) = WEEK(CURDATE(), 1)'),
            ],
        };

        let transaction: Transaction | null = null;

        try {
            transaction = await this.coursetableModel.sequelize.transaction();

            const recordsToInsert: any = await this.coursetableModel.findAll({
                attributes: { exclude: ['status', 'id'] },
                where,
                transaction,
            });
            const filterData = recordsToInsert.map(({ dataValues }) => ({
                ...dataValues,
                date: new Date(new Date(dataValues.date).valueOf() + 7 * 24 * 60 * 60 * 1000),
            }));
            await this.coursetableModel.bulkCreate(filterData, { transaction });
            await transaction.commit();
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }

    async deleteRecordsFromNextWeek() {
        const currentDate = new Date();
        const nextMonday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));

        await this.coursetableModel.destroy({
            where: {
                date: {
                    [Op.gte]: nextMonday,
                },
            },
        });
    }

    editCoursetable(params: CoursetableDto) {
        const { id } = params;
        if (typeof id === 'undefined') {
            return this.createCoursetable(params)
        } else {
            return this.coursetableModel.update({ ...params }, { where: { id } })
        }
    }

    remove(id: number) {
        return this.coursetableModel.destroy({ where: { id } })
    }
}
