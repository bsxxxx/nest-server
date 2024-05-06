import { Role } from '@/utils/enums';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { Roles } from '../auth/roles';
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';

@Controller('bonus')
@Roles(Role.ORGADM)
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post()
  create(@Body() createBonusDto: CreateBonusDto) {
    return this.bonusService.create(createBonusDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.bonusService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBonusDto: UpdateBonusDto) {
    return this.bonusService.update(+id, updateBonusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonusService.remove(+id);
  }

  @Get('bonus-excel')
  async exportBonus(@Res() res, @Query() query: any) {
    const { buffer, filename, mimeType }: any =
      await this.bonusService.export(query);
    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }
}
