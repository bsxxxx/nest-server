
import {
  Body,
  Controller,
  Get,
  Post,
  Session,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档
import { responseMessage } from '@/utils';
import type { SessionTypes } from '@/utils/types';
import { Public } from '@/utils';

import { AuthService } from './auth.service'; // Auth Service
import {
  LoginParamsDto,
} from './dto';

@ApiTags('用户登录模块')
@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  /**
   * @description: 用户登录
   */
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @Public()
  async login(
    @Body() loginParams: LoginParamsDto,
    @Session() session: SessionTypes
  ) {
    const response = await this.authService.login(loginParams, session);
    return response;
  }

  /**
   * @description: 用户退出登录
   */
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @Post('logout')
  @ApiOperation({ summary: '退出登录' })
  async logout(@Session() session: SessionTypes) {
    const response = await this.authService.logout(session);
    return response;
  }

  /**
   * @description: 获取当前用户信息
   */
  @Get('userinfo')

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOperation({ summary: '获取当前用户信息' })
  async getCurrentUserInfo(@Session() session: SessionTypes) {
    const { id, name: username, avatar, role } = session.currentUserInfo
    return responseMessage({ id, username, avatar, role });
  }
}
