import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { RefreshTokenDto } from '../dto/auth-refresh.dto'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,

      secretOrKey: configService.get('JWT_SECRET_REFRESH_KEY'),
      passReqToCallback: true,
    })
  }

  async validate(refreshTokenDto: RefreshTokenDto) {
    return { ...refreshTokenDto }
  }
}
