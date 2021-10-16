import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { jwtModuleOptionsConstant } from "./config/jwt-module-options";
import { AuthController } from "./controllers/auth.controller";
import { UserSchema } from "./models/user/user.model";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule,
    JwtModule.register(jwtModuleOptionsConstant)
  ],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
