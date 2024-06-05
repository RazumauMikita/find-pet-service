import { HttpException, HttpStatus } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { getRandom32Char } from 'src/utils/commonUtils'
import { config } from 'dotenv'

config()
export const multerConfig = {
  dest: process.env.UPLOAD_LOCATION, //'./public/img'
}

export const multerOptions: MulterOptions = {
  limits: { fileSize: +process.env.MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true)
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      )
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath)
      }
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      cb(null, `${getRandom32Char()}${extname(file.originalname)}`)
    },
  }),
}
