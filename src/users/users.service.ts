import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './entities/user.entity'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    })
    if (existUser) {
      throw new HttpException('User already exist!', HttpStatus.NOT_FOUND)
    }
    const { id } = await this.userRepository.save({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      country: createUserDto.country,
      city: createUserDto.city,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return await this.findOne(id)
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    await this.isUserExist(id)

    const { password, ...result } = await this.userRepository.findOne({
      where: { id },
    })
    return result
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.isUserExist(id)

    if (existUser.password !== updateUserDto.oldPassword)
      throw new HttpException('Old password is wrong.', HttpStatus.FORBIDDEN)

    await this.userRepository.update(id, {
      updatedAt: Date.now(),
      password: updateUserDto.newPassword,
      version: existUser.version + 1,
      city: updateUserDto.city,
      country: updateUserDto.country,
      name: updateUserDto.name,
      email: updateUserDto.email,
    })

    return await this.findOne(id)
  }

  async remove(id: string) {
    await this.isUserExist(id)
    await this.userRepository.delete(id)
  }

  async isUserExist(id: string) {
    const isUserExist = await this.userRepository.findOne({
      where: { id },
    })
    if (!isUserExist)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND)
    return isUserExist
  }
}
