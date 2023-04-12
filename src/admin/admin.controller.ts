import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(AuthGuard('googleAdmin'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('googleAdmin'))
  googleAuthRedirect(@Req() req) {
    return this.adminService.googleLogin(req);
  }
}
