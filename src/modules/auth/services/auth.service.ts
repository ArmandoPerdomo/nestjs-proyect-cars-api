import { Injectable } from '@nestjs/common';
import { User } from "../models/user/user.model";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async validateUser(email: string, password: string){
    const user = await this.usersService.findOne({email: email});
    if(!user){
      return null;
    }

    if(await bcrypt.compare(password, user.password)){
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
