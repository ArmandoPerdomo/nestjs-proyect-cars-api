import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { CreateUserDto } from "../models/user/dto/create-user.dto";
import { User } from "../models/user/user.model";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ){ }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('session')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async addUser(@Body() user: User){
    const validated = await validate(new CreateUserDto(user));
    if(validated.length){
      throw new BadRequestException(validated);
    }

    if(await this.usersService.findOne({email: user.email})){
      throw new ConflictException("The user exists");
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    const ref = await this.usersService.create(user);
    return User.fromRef(ref);
  }
}
