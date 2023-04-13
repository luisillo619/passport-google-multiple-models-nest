import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleUserGuard } from './utils/guardian.user.google.auth';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(GoogleUserGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleUserGuard)
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
