import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { AnyFilesInterceptor } from '@nestjs/platform-express'

import { LostService } from './lost.service'

import { CreateLostDto } from './dto/create-lost.dto'
import { UpdateLostDto } from './dto/update-lost.dto'

import { multerOptions } from 'src/config/multer.config'

@Controller('lost')
export class LostController {
  constructor(private readonly lostService: LostService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  create(
    @Body() createLostDto: CreateLostDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    console.log(files)
    return this.lostService.create(createLostDto, files)
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
