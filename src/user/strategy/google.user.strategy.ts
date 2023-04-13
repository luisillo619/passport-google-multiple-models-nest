import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from '../schema/user.schema';


@Injectable()
export class GoogleUserStrategy extends PassportStrategy(
  Strategy,
  'googleUser',
  
) {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/user/redirect`,
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
    profile: Profile,
  ): Promise<User> {
    const user = await this.userService.validateUser({
      email: profile.emails[0].value,
      fullName: profile.displayName,
      subject: profile.id,
      provider: profile.provider,
      picture: profile._json.picture,
    });
    return user || null;
  }

 
}
