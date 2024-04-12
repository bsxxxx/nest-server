import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import User from './models/user.model';
// import { logger } from './middleware/logger.middleware';
// import { requestMiddleware } from '@/middleware/request.middleware'; // 全局请求拦截中间件
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  // 配置文件访问  文件夹为静态目录，以达到可直接访问下面文件的目的
  const rootDir = join(__dirname, '..');
  // 初始内置管理员
  User.findOrCreate({
    where: { name: "orgadm" }, defaults: { name: "orgadm", password: "1234", chinese_name: "管理员", english_name: "orgadm", role: "orgadm" }
  })
  app.use('/api/upload', express.static(join(rootDir, '/upload')));
  app.use(express.urlencoded({ extended: true }));
  //默认关闭浏览器 会话过期
  app.use(
    session({
      secret: process.env.SESSION,
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(requestMiddleware) // 请求中间件
  // app.use(logger) //日志

  app.useGlobalPipes(new ValidationPipe());// 全局
  // 全局添加接口前缀
  app.setGlobalPrefix(process.env.REQUEST_URL_PREFIX);
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_UI_TITLE)
    .setDescription(process.env.SWAGGER_UI_DESC)
    .setVersion(process.env.SWAGGER_API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_SETUP_PATH, app, document);
  await app.listen(process.env.APP_PROT);

}
bootstrap();
