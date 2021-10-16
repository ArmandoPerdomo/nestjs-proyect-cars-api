import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CarsController } from "./controllers/cars.controller";
import { CarSchema } from "./models/car.model";
import { CarsService } from "./services/cars.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Car', schema: CarSchema}])
  ],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
