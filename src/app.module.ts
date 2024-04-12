import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import Modules from "./modules"
import { APP_GUARD } from '@nestjs/core';
import App_globalConfig from './config/configuration'; // 全局配置
import DatabaseConfig from './config/database'; // 数据库配置
import RedisConfig from './config/redis'; // redis配置
import { JwtAuthGuard } from './modules/auth/auth.guard'; // 身份验证
import { RolesGuard } from '@/modules/auth/roles'; // 角色控制
@Module({
  imports: [
    // 全局配置 Module
    ConfigModule.forRoot({
      envFilePath: '.development.env', // 设置 .env 文件路径
      isGlobal: true,
      load: [App_globalConfig, DatabaseConfig, RedisConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      // 注入 database 配置
      useFactory: async (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    ...Modules],
  providers: [
    // 全局启用身份验证
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
