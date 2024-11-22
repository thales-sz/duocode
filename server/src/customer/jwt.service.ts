import { Customer } from './entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  public async decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }

  public async generateToken(
    payload: Omit<Customer, 'password'>,
  ): Promise<string> {
    return this.jwtService.signAsync({ ...payload });
  }

  public validatePassword(
    inputPassword: string,
    storedPassword: string,
  ): boolean {
    return bcrypt.compareSync(inputPassword, storedPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(12);

    return bcrypt.hashSync(password, salt);
  }

  public async verify(token: string): Promise<Customer> {
    return this.jwtService.verifyAsync<Customer>(token);
  }
}
