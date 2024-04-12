/*
 * @Description: 数据库配置
 */
import { registerAs } from '@nestjs/config';
import * as path from 'path';
export default registerAs('database', () => ({
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST, // 这部分会和从env中进行合并
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_LIB,
  models: [path.resolve(__dirname, '..', 'models', '*.model{.ts,.js}')], // 导入所有模型
  logging: true,

  define: {
    timestamps: true, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
    createdAt: "created_time", // 重命名字段
    updatedAt: 'updated_time',
    underscored: true, // 开启下划线命名方式，默认是驼峰命名
    freezeTableName: true, // 禁止修改表名
    charset: 'utf8mb4',
  },
  synchronize: true,
  retryDelay: 500, //重试连接数据库间隔
  retryAttempts: 10, //重试连接数据库的次数
  autoLoadModels: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  // 配置数据库时间为东八区北京时间
  timezone: '+08:00',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true,
  },
}));
