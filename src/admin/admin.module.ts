import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schema/admin.schema';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { GoogleAdminStrategy } from './strategy/google.admin.strategy';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.respository';
import { GoogleAdminGuard } from './utils/guardian.admin.google.auth';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'googleAdmin' }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository,
    GoogleAdminStrategy,
   
    GoogleAdminGuard,
  ],

  exports:[
    AdminService
  ]
})
export class AdminModule {}
