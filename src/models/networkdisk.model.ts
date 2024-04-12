import { Column, Model, Table, DataType } from 'sequelize-typescript';
/**网盘 */
@Table({ tableName: 'network_disk' })
export default class NetworkDisk extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    @Column({ type: DataType.INTEGER, allowNull: false, comment: '用户id' })
    user_id: string;
    @Column({ type: DataType.STRING, allowNull: false, comment: '文件名称' })
    name: string;
    @Column({ type: DataType.STRING, allowNull: false, comment: '文件url' })
    url: string;
}