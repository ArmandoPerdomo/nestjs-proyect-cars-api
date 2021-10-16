import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto{
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  admissionDate: number;

  @IsString()
  @IsNotEmpty()
  driver: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;


  constructor(car?: any) {
    Object.assign(this, car);
  }
}
