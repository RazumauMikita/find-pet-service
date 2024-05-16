import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { tap } from 'rxjs/operators'

import { MyLogger } from './logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: MyLogger) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest()
    const method = req.method
    const url = req.url
    const body = JSON.stringify(req.body)

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse()
        const status = res.statusCode
        this.logger.log(
          `URL: ${url} - Method: ${method} - Status: ${status} - Body: ${body}`,
          context.getClass().name
        )
      })
    )
  }
}
