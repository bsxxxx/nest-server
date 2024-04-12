import { ApiProperty } from '@nestjs/swagger';

/**
 * @description: 保存用户数据 
 * @author:bi
 */

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: '用户名',
        default: 'orgadm',
        required: true,
    })
    name?: String;
    @ApiProperty({
        type: String,
        description: '密码',
        required: true,
        default: '1234',
    })
    password: String;

    @ApiProperty({
        type: String,
        description: '手机号',
        default: '11111111111',
        required: false,
    })
    phone: String;

    @ApiProperty({
        type: String,
        description: '性别',
        default: 'male',
        required: false,
    })
    gender: String;


    @ApiProperty({
        type: String,
        description: '身份证',
        default: "1xxxx",
        required: false,
    })
    id_card_number: String;

    @ApiProperty({
        type: String,
        description: '银行卡号',
        default: 12222,
        required: false,
    })
    bank_account_number: String;
    @ApiProperty({
        type: String,
        description: '入职日期',
        default: "2024/3/3",
        required: false,
    })
    employment_date: String;
    @ApiProperty({
        type: String,
        description: '开户行',
        default: "南京银行",
        required: false,
    })
    deposit_bank: String;

    @ApiProperty({
        type: String,
        description: '角色',
        default: 'orgadm',
        required: false,
    })
    role: string;
    @ApiProperty({
        type: String,
        description: '头像',
        required: false,
        default: '',
    })
    avatar: string;
}
