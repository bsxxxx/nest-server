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
    @Column({ type: DataType.DATE, allowNull: false, comment: '充值日期' })
    recharge_date: string;
    @Column({ type: DataType.STRING, allowNull: true, comment: '描述' })
    description: string;
    @BelongsTo(() => Student, {
        as: 'student', onDelete: 'CASCADE'
    })
    student: Student;

}