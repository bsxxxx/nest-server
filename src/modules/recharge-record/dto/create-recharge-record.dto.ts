import { ApiProperty } from "@nestjs/swagger";
export class CreateRechargeRecordDto {
    @ApiProperty({
        description: '充值日期',
        type: String,
        required: true
    })
    recharge_date: string
    @ApiProperty({
        description: '描述',
        type: String,
        required: true
    })
    descriptipn: string
}
