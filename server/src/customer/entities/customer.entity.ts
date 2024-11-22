import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../common/entity/abstract.entity';

@Entity('customers')
export class Customer extends DefaultEntity<Customer> {
  @Column({ type: 'text', nullable: false })
  firstName: string;

  @Column({ type: 'text', nullable: false })
  lastName: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;
}
