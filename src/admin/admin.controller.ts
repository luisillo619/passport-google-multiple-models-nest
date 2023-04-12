import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
  redirect(@Req() request, @Res() response: any) {
    const userAgent = request.headers['user-agent'];

    if (/mobile/i.test(userAgent)) {
      if (request.user) {
        return response.redirect(`${process.env.DEEP_LINK_CLIENT}myapp/home`);
      }
      return 'Not Authenticated';
    }
    return response.redirect(`${process.env.API_URL}/admin/status`);
  }

  @Get('status')
  status(@Req() request: Request & { user: any }) {
    if (request.user) return 'Authenticated';
    return 'Not Authenticated';
  }
}
