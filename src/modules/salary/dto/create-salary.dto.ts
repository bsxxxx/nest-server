import { ApiProperty } from "@nestjs/swagger";

export class CreateSalaryDto {
    @ApiProperty({
        type: String,
        description: '用户id',
        default: '1',
        required: false,
    })
    user_id: string;
    @ApiProperty({
        type: String,
        description: '结算日期',
        default: '1',
        required: false,
    })
    settlement_date: string;
    @ApiProperty({
        type: String,
        description: '基本工资',
        default: '1',
        required: false,
    })
    basic_salary: number;
    @ApiProperty({
        type: String,
        description: '课时数',
        default: '1',
        required: false,
    })
    class_hour: number;
    @ApiProperty({
        type: String,
        description: '提成点',
        default: '1',
        required: false,
    })
    commission_rate: string;
    @ApiProperty({
        type: String,
        description: '提成金额',
        default: '1',
        required: false,
    })
    commission: number;
    @ApiProperty({
        type: String,
        description: '应发金额',
        default: '1',
        required: false,
    })
    gross_amount: number;
    @ApiProperty({
        type: String,
        description: '奖励',
        default: '1',
        required: false,
    })
    reward: number;
    @ApiProperty({
        type: String,
        description: '罚款',
        default: '1',
        required: false,
    })
    penalty: number;
    @ApiProperty({
        type: String,
        description: '总金额',
        default: '1',
        required: false,
    })
    total_amount: number;

}
export class DeleteSalaryDto {
    @ApiProperty({
        type: String,
        description: 'id',
        default: '1',
        required: false,
    })
    id: string;
}
