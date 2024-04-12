import { Column, Model, Table, NotEmpty, Length, DataType, HasMany } from 'sequelize-typescript';
import Coursetable from './coursetable.model';
/**学生表 */
@Table({ tableName: 'student_list' })
export default class Student extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    @Column
    phone: string;
    //用户名称
    @NotEmpty({ msg: '用户名称不能为空' })
    @Length({ min: 2, max: 32, msg: '用户名称的长度在2-36个字符' })
    @Column({ type: DataType.STRING(32), allowNull: false, unique: true, comment: '中文名称' })
    chinese_name: string;
    @Column({ type: DataType.STRING(32), allowNull: false, comment: '英文名称' })
    english_name: string;
    @Column
    gender: string;
    @Column
    age: string;
    @Column
    grade: string;
    @Column
    student_bg: string;
    @Column
    channel: string;
    @Column
    recharge_record: string;
    @Column
    purchase_date: string;
    @Column
    course_category: string;
    @Column
    total_hours: string;
    @Column
    course_unit_price: string;
    @Column
    total_amount: string;
    @Column
    textbook: string;
    @Column
    mail: string;
    @Column
    settlement_date: string;
    @Column
    teacher_name: string;
    @Column
    teacher_id: string;
    @Column
    notes: string;
    @HasMany(() => Coursetable, { as: "course" })
    courses: Coursetable[];
}