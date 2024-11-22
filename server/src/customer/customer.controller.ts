import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginDto } from './dto/login.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('/:customerId')
  async findOne(@Param('customerId', new ParseUUIDPipe()) customerId: string) {
    return this.customerService.findOne(customerId);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.customerService.login(loginDto);
  }
}
