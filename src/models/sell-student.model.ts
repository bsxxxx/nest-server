import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Sell from './sell.model';
@Table({ tableName: 'sell_student' })
export default class SellStudent extends Model<SellStudent> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: string;
    @Column({ type: DataType.DATEONLY, comment: "日期" })
    date: Date;
    @Column({ type: DataType.STRING, comment: "学生姓名" })
    studentName: string;
    @ForeignKey(() => Sell)
    @Column({ type: DataType.INTEGER, comment: "销售员ID" })
    salespersonId: number;

    @Column({ type: DataType.STRING, comment: "手机号" })
    phoneNumber: string;

    @Column({ type: DataType.TEXT, comment: "基本信息" })
    basicInfo: string;

    @Column({ type: DataType.STRING, comment: "体验课时间" })
    trialClassTime: string;

    @Column({ type: DataType.INTEGER, comment: "课程类别" })
    courseCategory: number;

    @Column({ type: DataType.STRING, comment: "教材名称" })
    textbookName: string;

    @Column({ type: DataType.DECIMAL(10, 2), comment: "课单价" })
    lessonPrice: number;

    @Column({ type: DataType.INTEGER, comment: "总课时" })
    totalLessons: number;

    @Column({ type: DataType.DECIMAL(10, 2), comment: "总金额" })
    totalAmount: number;

    @Column({ type: DataType.INTEGER, comment: "体验课数量数" })
    trialClassCount: number;

    @Column({ type: DataType.INTEGER, comment: "体验课排课测试数" })
    trialClassSchedulingTest: number;

    @Column({ type: DataType.INTEGER, comment: "正式课测试数" })
    formalClassTest: number;
    @BelongsTo(() => Sell, { as: "sell", onDelete: 'CASCADE' })
    sell: Sell;
}