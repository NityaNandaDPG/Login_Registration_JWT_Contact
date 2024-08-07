import { Controller, Get,Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard("local"))
  login(@Request() req): string {
    return this.authService.generateToken(req.user)
  }

}
