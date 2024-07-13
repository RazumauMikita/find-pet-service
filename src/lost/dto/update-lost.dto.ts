import { PartialType } from '@nestjs/mapped-types'
import { CreateLostDto } from './create-lost.dto'

export class UpdateLostDto extends PartialType(CreateLostDto) {}
