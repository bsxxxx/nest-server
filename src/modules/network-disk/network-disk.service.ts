import { Injectable } from '@nestjs/common';
import { CreateNetworkDiskDto } from './dto/create-network-disk.dto';
import NetworkDisk from '@/models/networkdisk.model';
import { InjectModel } from '@nestjs/sequelize';
const fs = require('fs');
@Injectable()
export class NetworkDiskService {
  constructor(
    @InjectModel(NetworkDisk)
    private readonly networkDiskModel: typeof NetworkDisk
  ) {

  }
  create(createNetworkDiskDto: CreateNetworkDiskDto) {
    return this.networkDiskModel.create({ ...createNetworkDiskDto })
  }

  async findAll() {
    return this.networkDiskModel.findAll();
  }

  remove(body) {
    const { id, url } = body
    fs.unlink(`upload/network-disk/${url}`, (err) => {
      this.networkDiskModel.destroy({ where: { id } });
      if (err) {
        console.error('Error deleting file:', err);
      }
    });
  }
}
