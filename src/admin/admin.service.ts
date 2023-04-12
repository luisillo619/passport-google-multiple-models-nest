import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google en Admin',
      user: req.user
    }
  }
}