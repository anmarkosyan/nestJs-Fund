import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Espresso',
      brand: 'ArmenianCoffee',
      flavors: ['chocolate', 'vanilla'],
    },
  ];
  getAll() {
    const length = this.coffees.length;
    return [{ length }, ...this.coffees];
  }

  getOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      //throw new HttpException(`Coffee with #${id} not found!!`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return coffee;
  }

  create(body) {
    this.coffees.push(body);
    return body;
  }

  update(id: string, body) {
    let data = this.coffees.find((item) => item.id === +id);
    if (data) {
      //return data = body;
    }
  }
  delete(id: string) {
    const data = this.coffees.findIndex((item) => item.id === +id);
    if (data >= 0) {
      this.coffees.splice(data, 1);
    }
  }
}
