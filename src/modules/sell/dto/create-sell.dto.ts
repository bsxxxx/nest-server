import { Roles } from "@/modules/auth/roles"
import { Role } from "@/utils/enums"
import { ApiProperty } from "@nestjs/swagger"
@Roles(Role.ORGADM)
export class CreateSellDto {
    @ApiProperty({
        description: '销售人员',
        type: String,
        required: true
    })
    name: string
    @ApiProperty({
        description: '描述',
        type: String,
        required: true
    })
    descriptipn: string
}
