import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/repository/base.repository';
import { AdminDocument, Admin } from './schema/admin.schema';

@Injectable()
export class AdminRepository extends BaseRepository<AdminDocument> {
  constructor(@InjectModel(Admin.name) _adminModel: Model<AdminDocument>) {
    super(_adminModel);
  }
}
