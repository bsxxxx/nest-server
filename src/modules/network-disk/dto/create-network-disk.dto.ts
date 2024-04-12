import { ApiProperty } from '@nestjs/swagger';

export class CreateNetworkDiskDto {
    @ApiProperty({
        type: String,
        description: '文件名称',
        default: 'test',
        required: true,
    })
    name: String;
    @ApiProperty({
        type: String,
        description: '用户id',
        default: 'test',
        required: true,
    })
    user_id: String;
    @ApiProperty({
        type: String,
        description: '文件url',
        default: 'test',
        required: true,
    })
    url: String;
}
