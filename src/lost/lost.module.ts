import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'src/users/users.module'

import { LostService } from './lost.service'
import { LostController } from './lost.controller'

import { LostEntity } from './entities/lost.entity'
import { UserEntity } from 'src/users/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([LostEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
  ],

  controllers: [LostController],
  providers: [LostService],
  exports: [LostService],
})
export class LostModule {}
