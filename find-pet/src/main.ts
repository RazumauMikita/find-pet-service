import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { SwaggerModule } from '@nestjs/swagger'
import { parse } from 'yaml'

import { AppModule } from './app.module'
import { MyLogger } from './logger/logger.service'

import { LoggingInterceptor } from './logger/logger.interceptor'
import { ExceptionsFilter } from './exeptionFilter/exeption.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(MyLogger))
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter))
  app.useGlobalInterceptors(new LoggingInterceptor(new MyLogger()))

  const file = await readFile(join(__dirname, '../doc/api.yaml'), 'utf-8')
  const swaggerDocument = parse(file)

  SwaggerModule.setup('docs', app, swaggerDocument)

  await app.listen(process.env.PORT)
}
bootstrap()
