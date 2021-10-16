import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCarDto{
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsOptional()
  admissionDate: number;

  @IsString()
  @IsOptional()
  driver: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;


  constructor(car?: any) {
    Object.assign(this, car);
  }
}
