/*
 * @Description: 登录鉴权 Dto
 */
import { ApiProperty } from '@nestjs/swagger';
/**
 * @description: 登录参数
 */
export class LoginParamsDto {

  @ApiProperty({
    type: String,
    description: '用户名',
    default: 'orgadm',
    required: false,
  })
  username?: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: '1234',
    required: false,
  })
  password?: string;

}
