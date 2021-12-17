import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}
  async getAll() {
    return await this.coffeeRepository.find();
  }

  async getOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id);

    if (!coffee) {
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return coffee;
  }

  async create(body: CreateCoffeeDto) {
    const newCoffee = await this.coffeeRepository.create(body);
    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: string, body: any) {
    const updatedData = await this.coffeeRepository.preload({
      id: +id,
      ...body,
    });
    if (!updatedData) {
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return this.coffeeRepository.save(updatedData);
  }9

  async delete(id: string) {
    const removedData = await this.coffeeRepository.findOne(id);
    return this.coffeeRepository.remove(removedData);
  }
}
