export class CreateLostDto {
  ownerId: string
  description: string
  coordinates: string
  images: Express.Multer.File[]
}
