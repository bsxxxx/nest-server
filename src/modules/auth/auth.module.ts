import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import App_configuration from '@/config/configuration'; // 全局配置
import User from '@/models/user.model';
import { RedisCacheService } from '@/modules/redis-cache/redis-cache.service'; // RedisCache Service

import { AuthController } from './auth.controller'; // Auth Controller
import { AuthService } from './auth.service'; // Auth Service
import { JwtStrategy } from './jwt.strategy';
@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      // 这里不设置 token 过期时间，过期时间在 redis 里面设置
      secret: App_configuration().secret,
    })
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [AuthController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [AuthService, RedisCacheService, JwtStrategy],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [AuthService],
})
export class AuthModule { }
