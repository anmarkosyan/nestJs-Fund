import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get('getAll')
  getAll(@Query() querySting) {
    return this.coffeesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.coffeesService.getOne(id);
  }

  @Post()
  createOne(@Body() body: CreateCoffeeDto) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeesService.delete(id);
  }
}
