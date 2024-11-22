import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`,
          algorithm: 'HS512',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, JwtService],
})
export class CustomerModule {}
