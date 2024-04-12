/*
 * @Description: Files Controller
 */
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';
import { NetworkDiskService } from '../network-disk/network-disk.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档
import { responseMessage } from '@/utils';
import type { Response, SessionTypes } from '@/utils/types';

import { UploadFileDto } from './dto';
import { Roles } from '../auth/roles';
import { Role } from '@/utils/enums';

@ApiTags('文件上传')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Roles(Role.ORGADM, Role.CLERK, Role.COURSE_CONSULTANT, Role.LEARNING_CONSULTANT)
@Controller('upload')
export class FilesController {
  constructor(
    private userService: UserService,
    private networkDiskService: NetworkDiskService,
  ) {

  }

  /**
   * @description: 上传网盘
   */
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('network-disk/:id')
  @ApiBody({
    description: '单个文件上传',
    type: UploadFileDto,
  })
  uploadFile(
    @Query("name") name,
    @Req() req,
    @Param("id") user_id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Response {
    console.log({ user_id, name, url: req.url }, '{ user_id, name, url: req.url }');

    this.networkDiskService.create({ user_id, name, url: req.url })
    return responseMessage(file);
  }
  /**
   * @description: 上传单个文件
   */
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('avatar/:id')
  @ApiBody({
    description: '单个文件上传',
    type: UploadFileDto,
  })
  uploadAvatar(
    @Param('id') id: string,
    @Session() session: SessionTypes,
    @UploadedFile() file: Express.Multer.File,
  ): Response {
    this.userService.update({ id, avatar: file.filename })
    session.currentUserInfo.avatar = file.filename
    return responseMessage(file);
  }

}


