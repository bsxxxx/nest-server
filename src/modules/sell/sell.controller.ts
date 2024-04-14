import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { SellService } from './sell.service';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';

@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) { }

  @Post()
  create(@Body() createSellDto: CreateSellDto) {
    return this.sellService.create(createSellDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellStudentDto: UpdateSellDto) {
    return this.sellService.update(+id, updateSellStudentDto);
  }

  @Get('user')
  findAll() {
    return this.sellService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellService.remove(+id);
  }
}
