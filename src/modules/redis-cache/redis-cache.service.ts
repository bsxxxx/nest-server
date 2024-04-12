import { Injectable } from '@nestjs/common';
import RedisC, { Redis } from 'ioredis';

import RedisConfig from '@/config/redis'; // redis配置

@Injectable()
export class RedisCacheService {
  redisClient: Redis;

  // 初始化 redis 实例
  constructor() {
    this.redisClient = new RedisC(RedisConfig());
  }

  /**
   * @description: 设置 redis 缓存
   * @param {string} key
   * @param {string} value
   * @param {number} seconds: 过期时间
   */
  async cacheSet(key: string, value: string, seconds?: number): Promise<void> {
    value = JSON.stringify(value);
    if (!seconds) {
      await this.redisClient.set(key, value);
    } else {
      await this.redisClient.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @description: 获取 redis 缓存
   * @param {string} key
   */
  async cacheGet(key: string): Promise<any> {
    return this.redisClient.get(key);
  }

  /**
   * @description: 删除 redis 缓存
   * @param {string} key
   */
  async cacheDel(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  /**
   * @description: 清空 redis 缓存
   */
  async cacheFlushall(): Promise<void> {
    await this.redisClient.flushall();
  }
}
