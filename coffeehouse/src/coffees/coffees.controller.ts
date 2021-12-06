import {Controller, Get, Post, Param, Body} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('getAll')
  getAll() {
    return 'This will return all coffees))))';
  }

  @Get(':id')
 // @HttpCode(HttpStatus.GONE) //for 410 status code
  getOne(@Param('id') id: string) {
    return `This is route with id #${id}.`;
  }

  @Post()
  createOne(@Body() body) {
    return body;
  }
}
