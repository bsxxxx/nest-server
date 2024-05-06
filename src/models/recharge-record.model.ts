import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Student from './student.model';
/**学员充值记录表 */
@Table({ tableName: 'recharge_records' })
export default class RechargeRecords extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    @ForeignKey(() => Student)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: '学生id' })
    student_id: string;
    @Column({ type: DataType.STRING, allowNull: false, comment: '录入人员' })
    operation_name: string;
    @Column({ type: DataType.DATE, allowNull: false, comment: '充值日期' })
    recharge_date: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '课程类别' })
    course_category: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '总课时' })
    total_hours: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '课程单价' })
    course_unit_price: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '总金额' })
    total_amount: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '教材名称' })
    textbook: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '邮箱地址' })
    mail: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '结算日期' })
    settlement_date: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '标签' })
    notes: string;

    @BelongsTo(() => Student, {
        as: 'student', onDelete: 'CASCADE'
    })
    student: Student;

}