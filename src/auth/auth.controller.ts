import { Body, Headers,Controller, Post, Param, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { MailService } from "src/mailgun/mail.service";
import { User } from "src/user/user.entity";
@Controller("/auth")
export class AuthController{
    constructor(private authService:AuthService,
        private mailService: MailService,
    ){}

    @Post('getToken')
    async verifyAgain(@Param('email') email: string){
        const token=this.authService.generateToken({ email:email } as User)
        await this.mailService.sendVerificationEmail(email,token);
        return { message: 'Verification email sent successfully' };
    }
 
    @Post('verify')
    async verifyEmail(@Body() body: { token: string }) {
        await this.authService.verifyEmail(body.token);
        return { message: 'Email verified successfully' };
    }
} 