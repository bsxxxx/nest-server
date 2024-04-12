import { registerAs } from '@nestjs/config';
import { toNumber } from 'lodash';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST, // 主机名
  port: toNumber(process.env.REDIS_PORT), // 端口号
  db: toNumber(process.env.REDIS_DB), //目标库,
  password: process.env.REDIS_PASSWORD,
  family: 4, // 4 (IPv4) or 6 (IPv6)
  expiresin: 60 * 60 * 24 * 1, // redis 过期时长,默认1天
}));
