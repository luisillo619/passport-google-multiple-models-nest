import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    let user;
    if(payload.role === "admin"){
         user = await this.adminService.findById(payload._id);
    }
    else if(payload.role === "user"){
     user = await this.userService.findById(payload._id);
    }
    return user ? done(null, user) : done(null, null);
  }
}
