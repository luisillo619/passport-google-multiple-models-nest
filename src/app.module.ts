import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controllers';
import { PassportModule } from '@nestjs/passport';
import { SerializerModule } from './serialize/serialize.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AdminModule,
    UserModule,
    SerializerModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
