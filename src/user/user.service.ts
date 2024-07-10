import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { MailService } from "src/mailgun/mail.service";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,
    @Inject(forwardRef(() => AuthService))  private readonly authService:AuthService,
    private mailService: MailService){}

    async create(createUserDto: CreateUserDto) :Promise<User>{
      const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    
      if (existingUser) {
          throw new Error('Username already exists');
      }
        let user:User=new User(); 
        user.username=createUserDto.username;
        user.password=await bcrypt.hash(createUserDto.password, 10);
        user.email=createUserDto.email; 
        user.age=createUserDto.age;
        // const token=this.authService.generateToken({ email: createUserDto.email } as User)
        // await this.mailService.sendVerificationEmail(createUserDto.email,token);
        return this.userRepository.save(user);
      } 
    
      findAll():Promise<User[]> {
        return this.userRepository.find(); 
      }
    
      findOne(id: number) {
        return this.userRepository.findOne({where:{id:id}});
      }
    
      async update(id: number, updateUserDto: UpdateUserDto) {
        let user=new User();
        user.username=updateUserDto.username;
        user.password=await bcrypt.hash(updateUserDto.password, 10);
        user.email=updateUserDto.email; 
        user.age=updateUserDto.age;
        return this.userRepository.save(user);
      }
    
      remove(id: number) {
        return this.userRepository.delete(id);
      }

    getUserByUserName(userName:string):Promise<User>{
        return this.userRepository.findOne({where:{username:userName}})
    }

    async verifyUser(email: string): Promise<void> {
        await this.userRepository.update({ email }, { isVerified: true });
    }
}