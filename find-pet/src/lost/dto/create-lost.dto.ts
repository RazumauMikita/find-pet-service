import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateLostDto {
  @IsNotEmpty()
  @IsUUID()
  ownerId: string
  @IsNotEmpty()
  description: string

  images: Express.Multer.File[]
}
