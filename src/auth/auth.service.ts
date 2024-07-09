import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
 export class AuthService{
    constructor(
        private readonly jwtService:JwtService,
        private userService: UserService
    ){
    }

    generateToken(payload:User):string{
        return this.jwtService.sign(payload)
    }

      async verifyEmail(token: string) {
    const decoded = this.jwtService.verify(token);
    await this.userService.verifyUser(decoded.email);
  }

 }