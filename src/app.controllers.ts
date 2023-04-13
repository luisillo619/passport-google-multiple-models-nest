import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import { IsString, IsOptional } from 'class-validator';
import { Response } from 'express';

class QueryRolDto {
  @IsString()
  @IsOptional()
  readonly role?: string;
}

@Controller('api/auth/google')
export class AppController {
  @Get('/')
  async authGoogle(@Res() response: Response, @Query() query: QueryRolDto) {
    if (query?.role === 'user') {
      response.redirect(`${process.env.API_URL}/user`);
    } else if (query?.role === 'admin') {
      response.redirect(`${process.env.API_URL}/admin`);
    } else {
      response.status(400).json({ message: 'Role Invalid' });
    }
  }

  @Get('status')
  async authGoogleStatus(@Req() request: Request & { user: any }) {
    if (request.user) return request.user;
    return 'Not Authenticated';
  }

  
}
