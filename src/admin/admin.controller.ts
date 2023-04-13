import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { GoogleAdminGuard } from './utils/guardian.admin.google.auth';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(GoogleAdminGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleAdminGuard)
  redirect(@Req() request, @Res() response: any) {
    const userAgent = request.headers['user-agent'];

    if (/mobile/i.test(userAgent)) {
      if (request.user) {
        return response.redirect(`${process.env.DEEP_LINK_CLIENT}myapp/home`);
      }
      return 'Not Authenticated';
    }
    return response.redirect(`${process.env.API_URL}/api/auth/google/status`);

  }

}
