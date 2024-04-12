import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { NetworkDiskService } from './network-disk.service';
import { CreateNetworkDiskDto } from './dto/create-network-disk.dto';
import { responseMessage } from '@/utils';
import { Public } from '@/utils';
import { Roles } from '../auth/roles';
import { Role } from '@/utils/enums';
@Roles(Role.ORGADM, Role.CLERK, Role.COURSE_CONSULTANT, Role.LEARNING_CONSULTANT)
@Controller('network-disk')

export class NetworkDiskController {
  constructor(private readonly networkDiskService: NetworkDiskService) { }

  @Post()
  create(@Body() createNetworkDiskDto: CreateNetworkDiskDto) {
    return this.networkDiskService.create(createNetworkDiskDto);
  }

  @Get()
  async findAll() {
    const data = await this.networkDiskService.findAll();
    return responseMessage(data)
  }
  @Delete()
  remove(@Body() body) {
    return this.networkDiskService.remove(body);
  }
  @Get('download/:filename')
  @Public()
  downlaod(@Param("filename") filename, @Res() res) {
    res.download(`upload/network-disk/${filename}`, (error) => {
      if (error) {
        console.log('下载过程中出现错误:', error);
      } else {
        console.log('文件下载完成');
      }
    });
  }



}
