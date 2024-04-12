import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 1, description: '用户ID' })
    id: string;
}
export class UpdatePassword {
    @ApiProperty({ example: 1, description: '旧密码' })
    oldPassword: string;
    @ApiProperty({ example: 1, description: '新密码' })
    newPassword: string;
}
