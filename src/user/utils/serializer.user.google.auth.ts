// import { PassportSerializer } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { UserService } from '../user.service';

// @Injectable()
// export class GoogleUserSerializer extends PassportSerializer {
//   constructor(private readonly userService: UserService) {
//     super();
//   }
  
//   serializeUser(user: any, done: Function) {
//     done(null, user);
//   }

//   async deserializeUser(payload: any, done: Function) {
//     const user = await this.userService.findById(payload._id);
//     return user ? done(null, user) : done(null, null);
//   }
// }
