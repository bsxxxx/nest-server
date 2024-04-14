import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import SellStudent from './sell-student.model';
@Table({ tableName: 'sell' })
export default class Sell extends Model<Sell> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    @Column({ type: DataType.STRING, comment: "销售人员姓名" })
    name: string;
    @Column({ type: DataType.TEXT, comment: "描述" })
    description: string;
    @HasMany(() => SellStudent, { as: "sell_student", onDelete: 'CASCADE' })
    sell_student: SellStudent;
}