/*
 * @Description: 全局请求拦截中间件
 */
import { NextFunction, Request, Response } from 'express';
export function requestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.method === 'GET' ||
    req.url.includes('login') ||
    req.url.includes('logout')
  ) {
    next();
  } else {
    res.status(400)
    res.send({ code: -1, message: '演示系统,禁止操作!', data: null });
  }
}
