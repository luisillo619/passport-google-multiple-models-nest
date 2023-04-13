import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleUserStrategy } from './strategy/google.user.strategy';
import { UserRepository } from './user.repository';
import { GoogleUserGuard } from './utils/guardian.user.google.auth';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'googleUser',
    }),
  ],

  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    GoogleUserStrategy,
    // GoogleUserSerializer,
    GoogleUserGuard,
  ],
  exports:[UserService]
})
export class UserModule {}
