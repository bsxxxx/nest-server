/*
 * @Description: Auth Service
 */
import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import type { WhereOptions } from 'sequelize/types';

import RedisConfig from '@/config/redis'; // redis配置
import User from '@/models/user.model';
import { RedisCacheService } from '@/modules/redis-cache/redis-cache.service'; // RedisCache Service
import { responseMessage } from '@/utils';
import type { Response, SessionTypes } from '@/utils/types';

import { LoginParamsDto } from './dto';

type responseResult = Response<Record<string, any>>;

@Injectable()
export class AuthService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) { }

  /**
 * @description: 校验用户信息
 * @param {LoginParamsDto} loginParams
 */
  async validateUser(
    loginParams: LoginParamsDto,
  ): Promise<responseResult> {
    // 解构参数
    const { username, password } = loginParams;
    // 查询条件
    const where: WhereOptions = { name: username }
    // 查找用户
    const userInfo = await this.userModel.findOne({ where });


    if (userInfo.password !== password) {
      throw new BadRequestException("密码不正确！")
    }
    return responseMessage(userInfo, '登录成功!');
  }
  /**
   * @description: 用户登录
   */
  async login(
    loginParams: LoginParamsDto,
    session: SessionTypes
  ): Promise<responseResult> {
    // 登录参数校验结果
    const authResult: responseResult = await this.validateUser(
      loginParams,
    );
    // 解构参数
    const { data: userInfo, code } = authResult;
    switch (code) {
      case 200:
        const token = this.jwtService.sign({
          name: userInfo.name,
          id: userInfo.id,
          role: userInfo.role,
        });

        // 将数据保存到session
        const currentUserInfo = userInfo
        session.currentUserInfo = currentUserInfo as any;
        await this.redisCacheService.cacheSet(
          `${userInfo.id}-${userInfo.name}`,
          token,
          RedisConfig().expiresin,
        );
        const { id, name: username, role, avatar, english_name } = currentUserInfo
        return responseMessage({
          token,
          id,
          username,
          english_name,
          role,
          avatar

        })
      // 其它情况直接返回结果
      default:
        return responseMessage(authResult);
    }
  }



  /**
   * @description: 用户退出当前登录
   */
  async logout(session: SessionTypes): Promise<responseResult> {
    const { currentUserInfo } = session;

    if (currentUserInfo) {
      const { id, name } = currentUserInfo;
      // 清空当前用户token
      this.redisCacheService.cacheDel(`${id}-${name}`);

      return responseMessage({});
    }
    throw new ForbiddenException('登录信息已失效!');
  }

}
