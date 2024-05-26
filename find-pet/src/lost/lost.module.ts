import { Module } from '@nestjs/common'
import { LostService } from './lost.service'
import { LostController } from './lost.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LostEntity } from './entities/lost.entity'
import { UsersService } from 'src/users/users.service'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'

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
