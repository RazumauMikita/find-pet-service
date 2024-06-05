export class CreateLostDto {
  ownerId: string
  isLost: boolean
  description: string
  coordinates: string
  images: Express.Multer.File[]
}
