export class CreateLostDto {
  ownerId: string
  isLost: boolean
  description: string
  lat: number
  lng: number
  images: Express.Multer.File[]
}
