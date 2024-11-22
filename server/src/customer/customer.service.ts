import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from './jwt.service';

@Injectable()
export class CustomerService {
  private logger = new Logger(CustomerService.name);

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(customer: CreateCustomerDto) {
    const existingCustomer = await this.customerRepository.findOneByEmail(
      customer.email,
    );

    if (existingCustomer) {
      this.logger.error('This e-mail is already in use.');
      throw new ConflictException('This e-mail is already in use.');
    }

    const hashedPassword = this.jwtService.encodePassword(customer.password);

    customer.password = hashedPassword;

    const newCustomer = await this.customerRepository.save(customer);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customerWithoutPassword } = newCustomer;

    return customerWithoutPassword;
  }

  async findOne(id: string) {
    const existingCustomer = await this.customerRepository.findOneById(id);

    if (!existingCustomer) {
      this.logger.error(`Customer from id: ${id} is not registered`);
      throw new NotFoundException(`Customer from id: ${id} is not registered`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customerWithoutPassword } = existingCustomer;

    return customerWithoutPassword;
  }

  async login(customerCredential: LoginDto): Promise<{ token: string }> {
    const existingCustomer = await this.customerRepository.findOneByEmail(
      customerCredential.email,
    );

    if (!existingCustomer) {
      this.logger.error(`Cannot find a customer for this e-mail`);
      throw new NotFoundException('Cannot find a customer for this e-mail');
    }

    const isPasswordValid = this.jwtService.validatePassword(
      customerCredential.password,
      existingCustomer.password,
    );

    if (!isPasswordValid) {
      this.logger.error(`Invalid password`);
      throw new NotFoundException('Invalid password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customerWithoutPassword } = existingCustomer;

    const token = await this.jwtService.generateToken(customerWithoutPassword);

    return { token };
  }
}
