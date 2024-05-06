import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Student from './student.model';
import User from './user.model';
/**课程表 */
@Table({ tableName: 'coursetable' })
export default class Coursetable extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: string;
  @Column({ type: DataType.STRING })
  name: string;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '用户id' })
  teacher_id: string;
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '学生id' })
  student_id: string;
  @Column({ type: DataType.DATEONLY })
  date: string;
  @Column({ type: DataType.INTEGER, defaultValue: '0', comment: '课程状态' })
  status: string;
  @Column
  start_time: string;
  @Column
  end_time: string;
  @Column
  student_name: string;
  @BelongsTo(() => User, { as: 'user', onDelete: 'CASCADE' })
  user;
  @BelongsTo(() => Student, { as: 'student', onDelete: 'CASCADE' })
  student;
}
