import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateLostDto } from './dto/create-lost.dto'
import { UpdateLostDto } from './dto/update-lost.dto'
import { LostEntity } from './entities/lost.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class LostService {
  constructor(
    @InjectRepository(LostEntity)
    private lostRepository: Repository<LostEntity>,
    private userService: UsersService
  ) {}
  async create(createLostDto: CreateLostDto) {
    await this.userService.isUserExist(createLostDto.ownerId)
    const { id } = await this.lostRepository.save({
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ownerId: createLostDto.ownerId,
      description: createLostDto.description,
    })
    return await this.findOne(id)
  }

  async findAll() {
    return await this.lostRepository.find()
  }

  async findOne(id: string) {
    return await this.isLostExist(id)
  }

  async update(id: string, updateLostDto: UpdateLostDto) {
    await this.isLostExist(id)
    await this.lostRepository.update(id, {
      description: updateLostDto.description,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    await this.isLostExist(id)
    await this.lostRepository.delete(id)
  }
  async isLostExist(id: string) {
    const isLostExist = await this.lostRepository.findOne({ where: { id } })
    if (!isLostExist)
      throw new HttpException("Lost doesn't exist", HttpStatus.NOT_FOUND)
    return isLostExist
  }
}