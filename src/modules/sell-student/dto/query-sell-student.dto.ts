import { ApiProperty } from "@nestjs/swagger";

export class QuerySellStudentDto {
    @ApiProperty({
        type: String,
        required: false
    })
    salespersonId?: string
}
