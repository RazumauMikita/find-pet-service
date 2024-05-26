import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { LostService } from './lost.service'
import { CreateLostDto } from './dto/create-lost.dto'
import { UpdateLostDto } from './dto/update-lost.dto'

@Controller('lost')
export class LostController {
  constructor(private readonly lostService: LostService) {}

  @Post()
  create(@Body() createLostDto: CreateLostDto) {
    return this.lostService.create(createLostDto)
  }

  @Get()
  findAll() {
    return this.lostService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLostDto: UpdateLostDto) {
    return this.lostService.update(id, updateLostDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lostService.remove(id)
  }
}
