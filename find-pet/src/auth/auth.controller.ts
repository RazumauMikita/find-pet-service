import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthDto } from './dto/auth-login.dto'
import { RefreshTokenDto } from './dto/auth-refresh.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Header('Content-Type', 'application/json')
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto)
  }

  @HttpCode(200)
  @UseGuards(RefreshJwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto)
  }
}
