import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { deleteFalseyProps } from "../../../core/functions/delete-falsey-props";
import { Car } from "../models/car.model";

@Injectable()
export class CarsService {

  constructor(
    @InjectModel('Car')
    private readonly carsRepository: Model<Car>
  ){}


  create(car: Car){
    return new this.carsRepository(car).save();
  }

  getOne(id: string){
    return this.carsRepository.findById(id);
  }

  async update(data: Partial<Car>, id: string){
    const existentCar = await this.getOne(id);
    data = deleteFalseyProps(data);
    for (const prop in data){
      existentCar[prop] = data[prop];
    }
    return existentCar.save();
  }

  async delete(id: string){
    const ref = await this.getOne(id);
    await ref.delete();
  }

  getAll(){
    return this.carsRepository.find();
  }
}
