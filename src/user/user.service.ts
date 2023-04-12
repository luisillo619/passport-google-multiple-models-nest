import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  // GOOGLE AUTH
  async validateUser(details: any): Promise<User> {
    return this._userRepository.validateUser(details);
  }

  async findById(id: string): Promise<User> {
    const user = await this._userRepository.findById(id);
    return user;
  }
}
