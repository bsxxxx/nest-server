
import { Column, Model, Table, NotEmpty, Length, DataType } from 'sequelize-typescript';
/**用户表 */
@Table({ tableName: 'userlist' })
export default class User extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    //用户名称
    @NotEmpty({ msg: '用户名称不能为空' })
    @Length({ min: 2, max: 32, msg: '用户名称的长度在2-36个字符' })
    @Column({ type: DataType.STRING(32), allowNull: false, comment: '用户名称' })
    name: string;
    @Column({ type: DataType.STRING(32), allowNull: false, comment: '中文名称' })
    chinese_name: string;
    @Column({ type: DataType.STRING(32), allowNull: false, comment: '英文名称' })
    english_name: string;
    @Column
    password: string;
    @Column
    phone: string;
    @Column
    gender: string;
    @Column
    id_card_number: string;
    @Column
    deposit_bank: string;
    @Column({ type: DataType.DATEONLY })
    employment_date: string;
    @Column
    description: string;
    @Column
    bank_account_number: string;
    @Column
    role: string;
    @Column
    avatar: string;
}