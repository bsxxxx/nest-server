import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './user.model';
import Coursetable from './coursetable.model';
import Student from './student.model';
/**上课记录表 */
@Table({ tableName: 'class_records' })
export default class ClassRecords extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: '用户id' })
    user_id: string;
    @ForeignKey(() => Coursetable)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: '课程id' })
    course_id: string;
    @ForeignKey(() => Student)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: '学生id' })
    student_id: string;
    @BelongsTo(() => User, {
        as: 'user', onDelete: 'CASCADE'
    })
    user: User;
    @BelongsTo(() => Coursetable, {
        as: 'course', onDelete: 'CASCADE'
    })
    course: Coursetable;
    @BelongsTo(() => Student, {
        as: 'student', onDelete: 'CASCADE'
    })
    student: Student;
    @Column({ type: DataType.INTEGER })
    status: number;
}