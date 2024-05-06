import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user.model';
import Student from './student.model';
/**奖金 */
@Table({ tableName: 'bonus' })
export default class Bonus extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: string;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '用户id' })
  user_id: number;
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: true, comment: '学生id' })
  student_id: string;
  @Column({ type: DataType.STRING }) // 开始日期
  start_date: string;
  @Column({ type: DataType.STRING }) // 结束日期
  end_date: string;
  @Column({ type: DataType.STRING })
  rewards: string;
  @Column({ type: DataType.INTEGER })
  reward_quantity: number;
  @Column({ type: DataType.INTEGER })
  amount: number;
  @BelongsTo(() => User, {
    as: 'user',
    onDelete: 'CASCADE',
  })
  user: User;
  @BelongsTo(() => Student, { as: 'student', onDelete: 'CASCADE' })
  student;
}
