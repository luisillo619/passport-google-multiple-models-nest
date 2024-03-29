import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { Admin } from '../schema/admin.schema';

@Injectable()
export class GoogleAdminStrategy extends PassportStrategy(
  Strategy,
  'googleAdmin',
) {
  constructor(private readonly adminService: AdminService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/admin/redirect`,
      scope: ['profile', 'email'],
      prompt: 'select_account consent',
    });
  }

  authorizationParams(options: any): object {
    return Object.assign(options, {
      prompt: 'select_account',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<Admin> {
    const user = await this.adminService.validateUser({
      email: profile.emails[0].value,
      fullName: profile.displayName,
      subject: profile.id,
      provider: profile.provider,
      picture: profile._json.picture,
    });
    return user || null;
  }
}
