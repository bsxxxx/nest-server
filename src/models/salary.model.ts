import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './user.model';
/**工资表 */
@Table({ tableName: 'salary' })
export default class Salary extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: '用户id' })
    user_id: string;
    @Column// 结算日期
    settlement_date: string;
    @Column({ type: DataType.FLOAT })// 基本工资
    basic_salary: number;
    @Column({ type: DataType.INTEGER })// 课时数
    class_hour: number;
    @Column({ type: DataType.STRING })// 提成点
    commission_rate: string;
    @Column({ type: DataType.FLOAT })// 提成金额
    commission: number;
    @Column({ type: DataType.FLOAT })// 应发金额
    gross_amount: number;
    @Column({ type: DataType.FLOAT })// 奖励
    reward: number;
    @Column({ type: DataType.FLOAT })// 罚款
    penalty: number;
    @Column({ type: DataType.FLOAT })// 总金额
    total_amount: number;

    @BelongsTo(() => User, {
        as: 'user', onDelete: 'CASCADE'
    })
    user: User;
}