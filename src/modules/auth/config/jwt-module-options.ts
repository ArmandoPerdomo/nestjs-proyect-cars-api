import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleOptionsConstant: JwtModuleOptions = {
  secret: 'nhZxkk0BBG',
  signOptions: {expiresIn: '1h'}
};
