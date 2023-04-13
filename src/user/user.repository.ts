import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/repository/base.repository';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) _userModel: Model<UserDocument>) {
    super(_userModel);
  }
}
