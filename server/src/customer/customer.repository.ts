import { Inject, Injectable } from '@nestjs/common';
import { DefaultRepository } from '../common/repository/default.repository';
import { Customer } from './entities/customer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository extends DefaultRepository<Customer> {
  private readonly customerRepository: Repository<Customer>;
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(Customer, dataSource);
    this.customerRepository = this.dataSource.getRepository(Customer);
  }

  async findOneByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ email });
  }
}
