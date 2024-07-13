import { BaseExceptionFilter } from '@nestjs/core'
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common'

import { MyLogger } from '../logger/logger.service'

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLogger(ExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    let statusCode = 500
    let message = 'Internal Server Error'
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
      message = JSON.stringify(exception.getResponse())
    }
    this.logger.error(
      `Status code: ${statusCode} --- Exception: ${message}`,
      ExceptionsFilter.name
    )

    super.catch(exception, host)
  }
}
