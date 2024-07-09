import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly userService: UserService) {
    super(); 
  }


  async validate(username: string, password: string): Promise<User> {
    const user = await this.fetchUser(username);

    if (user && bcrypt.compare(password, user.password)) {
      return { ...user };
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
  private async fetchUser(username: string): Promise<User> {
    const user = await this.userService.getUserByUserName(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}  