import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { SessionSerializer } from './serializer/serializer';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'User', schema: UserSchema}
      ])],
    controllers: [AuthController],
    providers: [GoogleStrategy,
        SessionSerializer,
        {
        provide: 'AUTH_SERVICE',
        useClass: AuthService
        }
    ]
})
export class AuthModule {}
