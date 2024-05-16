import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

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

  await app.listen(process.env.PORT)
}
bootstrap()
