import { ColumnNumericTransformer } from 'src/transformer/transformer'
import { UserEntity } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class LostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('bigint', {
    transformer: new ColumnNumericTransformer(),
  })
  createdAt: number

  @Column('bigint', {
    transformer: new ColumnNumericTransformer(),
  })
  updatedAt: number

  @Column('text', { array: true, nullable: true })
  images: string[]

  @Column()
  description: string

  @ManyToOne(() => UserEntity, (user) => user.lost)
  @JoinColumn({ referencedColumnName: 'id' })
  ownerId: string
}
