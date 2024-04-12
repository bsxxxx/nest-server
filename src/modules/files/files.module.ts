
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FilesController } from './files.controller'; // Files Controller
import { FilesService } from './files.service'; // Files Service
import User from '@/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import { NetworkDiskService } from '../network-disk/network-disk.service';
import NetworkDisk from '@/models/networkdisk.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, NetworkDisk]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        storage: diskStorage({
          // 配置文件上传后的文件夹路径
          destination: (req, file, cb) => {
            const url = req.path;
            let uploadDir = ""
            if (url.includes('network-disk')) {
              uploadDir = path.join(__dirname, '../../..', 'upload/network-disk')
            } else if (url.includes('avatar')) {
              uploadDir = path.join(__dirname, '../../..', 'upload/avatar')
            } else {
              uploadDir = path.join(__dirname, '../../..', 'upload')
            }
            cb(null, uploadDir);
          },
          filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);//获取扩展名
            const url = req.path;
            if (url.includes('avatar')) {
              const userId = req.params.id;
              cb(null, userId + ext);
            } else if (url.includes('network-disk')) {
              const url = Date.now() + ext;
              req.url = url;
              cb(null, url);
            }
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [UserService, FilesService, NetworkDiskService],
})
export class FilesModule { }
