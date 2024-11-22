import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DefaultEntity } from '../entity/abstract.entity';

export abstract class DefaultRepository<T extends DefaultEntity<T>> {
  private repository: Repository<T>;

  constructor(
    protected readonly entity: EntityTarget<T>,
    protected readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(entity);
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  async findOneById(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  async find(): Promise<[T[], number] | null> {
    return this.repository.findAndCount();
  }

  async delete(id: string) {
    const entity = await this.findOneById(id);

    return this.repository.remove(entity);
  }

  async deleteAll(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('This method can only be used in test environment');
    }
    const entities = await this.repository.find({});

    await this.repository.remove(entities);
  }
}
