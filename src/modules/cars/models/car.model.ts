import { Types } from "mongoose";
import * as mongoose from "mongoose";

export const CarSchema = new mongoose.Schema({
  brand: {type: String, required: true},
  model: {type: String, required: true},
  color: {type: String, required: true},
  admissionDate: {type: Number, required: true},
  driver: {type: String, required: true},
  active: {type: Boolean, required: true},
})

export class Car {
  id: string;
  brand: string;
  model: string;
  color: string;
  admissionDate: Date;
  driver: string;
  active: boolean;

  constructor(car?: Partial<Car>) {
    Object.assign(this, car);
  }

  static fromRef(ref: Car & {_id: Types.ObjectId}){
    return new Car({
      id: ref.id,
      brand: ref.brand,
      model: ref.model,
      color: ref.color,
      driver: ref.driver,
      admissionDate: ref.admissionDate,
      active: ref.active
    })
  }

}
