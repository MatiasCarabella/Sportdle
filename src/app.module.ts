import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot(),
            UserModule,
            PassportModule.register({ session: true }),
            MongooseModule.forRoot(process.env.MONGODB_CONNECTION), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}