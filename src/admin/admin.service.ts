import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.respository';
import { Admin } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(private readonly _adminRepository: AdminRepository) {}

  // GOOGLE AUTH
  async validateUser(details: any): Promise<Admin> {
    return this._adminRepository.validateUser(details);
  }

  async findById(id: string): Promise<Admin> {
    const user = await this._adminRepository.findById(id);
    return user;
  }
}
