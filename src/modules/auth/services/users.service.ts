import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User } from "../models/user/user.model";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private readonly repository: Model<User>
  ){}

  findOne(query: FilterQuery<User>){
    return this.repository.findOne(query);
  }

  create(user: User) {
    return new this.repository(user).save();
  }
}
