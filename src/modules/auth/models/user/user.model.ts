import * as mongoose from "mongoose";
import { Types } from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
})

export class User{
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  static fromRef(ref: User & {_id: Types.ObjectId}){
    return new User({
      id: ref.id,
      name: ref.name,
      email: ref.email
    })
  }
}
