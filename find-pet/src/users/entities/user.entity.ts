import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ColumnNumericTransformer } from 'src/transformer/transformer'
import { LostEntity } from 'src/lost/entities/lost.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  email: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  city: string

  @Column()
  version: number

  @Column('bigint', {
    transformer: new ColumnNumericTransformer(),
  })
  createdAt: number

  @Column('bigint', {
    transformer: new ColumnNumericTransformer(),
  })
  updatedAt: number

  @OneToMany(() => LostEntity, (lost) => lost.ownerId, {
    onDelete: 'SET NULL',
  })
  lost: LostEntity[]
}
