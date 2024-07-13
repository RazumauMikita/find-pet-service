import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthDto } from './dto/auth-login.dto'
import { RefreshTokenDto } from './dto/auth-refresh.dto'

export interface UserPayload {
  id: string
  email: string
}

export interface UserTokens {
  accessToken: string
  refreshToken: string
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    })

    if (isUserExist) {
      throw new HttpException('User already exists.', HttpStatus.CONFLICT)
    }

    const hash = await this.hashData(createUserDto.password)
    const result = await this.userService.create({
      ...createUserDto,
      password: hash,
    })

    return result
  }

  async login(authDto: AuthDto): Promise<UserTokens> {
    const user = await this.userRepository.findOne({
      where: { email: authDto.email },
    })
    const tokens = await this.getTokens(user.id, user.email)
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const payload = this.jwtService.decode(refreshTokenDto.refreshToken, {
      json: true,
    })
    if (!payload) {
      throw new BadRequestException('userId is invalid')
    }
    const { id, email } = payload as UserPayload
    return await this.getTokens(id, email)
  }

  hashData(data: string) {
    return argon2.hash(data)
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user)
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND)
    const isPasswordMatches = await argon2.verify(user.password, password)
    if (!isPasswordMatches)
      throw new HttpException('Password is incorrect.', HttpStatus.FORBIDDEN)

    if (user && isPasswordMatches) {
      return user
    }
    return null
  }

  async getTokens(userId: string, email: string): Promise<UserTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username: email },
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
          expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
        }
      ),
      this.jwtService.signAsync(
        { sub: userId, username: email },
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        }
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
