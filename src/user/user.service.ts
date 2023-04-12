import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google en User',
      user: req.user
    }
  }
}