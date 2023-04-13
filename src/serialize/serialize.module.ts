import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GoogleSerializer } from './serialize.service';
import { AdminModule } from 'src/admin/admin.module';


@Module({
  imports: [
  UserModule,
  AdminModule
  ],
  controllers: [],
  providers: [
    GoogleSerializer
  ],
})
export class SerializerModule {}
