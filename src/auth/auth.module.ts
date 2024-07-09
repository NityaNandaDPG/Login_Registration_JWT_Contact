import { forwardRef, Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MailService } from 'src/mailgun/mail.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.register({
        secret:"key",
        signOptions: {expiresIn:'300s'}   
    })
],
    controllers:[AuthController],
    providers: [LocalStrategy,JwtStrategy,AuthService,MailService],
    exports:[AuthService]
})
export class AuthModule {}