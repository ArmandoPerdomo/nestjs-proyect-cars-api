import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put, UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { validate } from "class-validator";
import { Car } from "../models/car.model";
import { CreateCarDto } from "../models/dto/create-car.dto";
import { UpdateCarDto } from "../models/dto/update-car.dto";
import { CarsService } from "../services/cars.service";
import {Types} from 'mongoose';

@Controller('cars')
export class CarsController {

  constructor(
    private readonly carsService: CarsService,
  ){}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    const refs = await this.carsService.getAll();
    return refs.map(ref => Car.fromRef(ref));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const exists = Types.ObjectId.isValid(id) && await this.carsService.getOne(id);
    if(!exists){
      throw new NotFoundException('RECORD_NOT_FOUND');
    }

    const ref = await this.carsService.getOne(id);
    return Car.fromRef(ref);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() car: Car){
    const validated = await validate(new CreateCarDto(car));
    if(validated.length){
      throw new BadRequestException(validated);
    }

    const ref = await this.carsService.create(car);
    return Car.fromRef(ref);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() car: Partial<Car>){
    const exists = Types.ObjectId.isValid(id) && await this.carsService.getOne(id);
    if(!exists){
      throw new NotFoundException('RECORD_NOT_FOUND');
    }

    const validated = await validate(new UpdateCarDto(car));
    if(validated.length){
      throw new BadRequestException(validated);
    }

    const ref = await this.carsService.update(car, id);
    return Car.fromRef(ref);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string){
    const exists = Types.ObjectId.isValid(id) && await this.carsService.getOne(id);
    if(!exists){
      throw new NotFoundException('RECORD_NOT_FOUND');
    }

    return this.carsService.delete(id);
  }
}
