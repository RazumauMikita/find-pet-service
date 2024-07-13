import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'

import { UserEntity } from 'src/users/entities/user.entity'

import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { RefreshTokenStrategy } from './strategies/refresh-jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
