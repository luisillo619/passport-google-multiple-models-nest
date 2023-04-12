import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('googleUser'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('googleUser'))
  redirect(@Req() request, @Res() response: any) {
    const userAgent = request.headers['user-agent'];

    if (/mobile/i.test(userAgent)) {
      if (request.user) {
        return response.redirect(`${process.env.DEEP_LINK_CLIENT}myapp/home`);
      }
      return 'Not Authenticated';
    }
    return response.redirect(`${process.env.API_URL}/user/status`);
  }

  @Get('status')
  status(@Req() request: Request & { user: any }) {
    if (request.user) return 'Authenticated';
    return 'Not Authenticated';
  }
}
