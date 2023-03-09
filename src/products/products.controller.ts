import { CreateProductDTO } from './dtos/create-product.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  getById(@Param('id') id: string): any {
    return this.productsService.getById(id);
  }
  @Delete('/:id')
  removeById(@Param('id') id: string): any {
    this.productsService.removeById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    this.productsService.create(productData);
    return { success: true };
  }
}
