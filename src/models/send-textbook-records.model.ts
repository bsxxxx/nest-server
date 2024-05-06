import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Student from './student.model';
/**发送教材记录表 */
@Table({ tableName: 'send_textbook_records' })
export default class SendTextbookRecords extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: string;
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '学生id' })
  student_id: string;
  @Column({ type: DataType.STRING, allowNull: false, comment: '录入人员' })
  operation_name: string;
  @Column({ type: DataType.STRING, allowNull: true, comment: '寄送人员' })
  send_name: string;
  @Column({ type: DataType.STRING, allowNull: true, comment: '课程类别' })
  course_category: string;
  @Column({ type: DataType.STRING, allowNull: true, comment: '教材名称' })
  name: string;
  @Column({ type: DataType.STRING, allowNull: true, comment: '教材价格' })
  price: string;
  @Column({ type: DataType.STRING, allowNull: true, comment: '收件地址' })
  address: string;
  @BelongsTo(() => Student, { as: 'student', onDelete: 'CASCADE' })
  student;
}
