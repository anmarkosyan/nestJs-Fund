import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  async getAll() {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async getOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return coffee;
  }

  async create(body: CreateCoffeeDto) {
    const flavors = await Promise.all(
      body.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const newCoffee = await this.coffeeRepository.create({ ...body, flavors });
    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: string, body: UpdateCoffeeDto) {
    const flavors =
      body.flavors &&
      (await Promise.all(
        body.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const updatedData = await this.coffeeRepository.preload({
      id: +id,
      ...body,
      flavors,
    });
    if (!updatedData) {
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return this.coffeeRepository.save(updatedData);
  }

  async delete(id: string) {
    const removedData = await this.coffeeRepository.findOne(id);
    return this.coffeeRepository.remove(removedData);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
