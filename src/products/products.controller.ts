import { CreateProductDTO } from './dtos/create-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product-dto';
import { LoggerInterceptor } from 'src/shared/interceptors/logger/logger';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService;
  }
  @UseInterceptors(LoggerInterceptor)
  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const findProduct = this.productsService.getById(id);
    if(!findProduct) throw new NotFoundException('Product not found'); 
    return this.productsService.getById(id);
  }
  @Delete('/:id')
  removeById(@Param('id', new ParseUUIDPipe()) id: string) {
    const findProduct = this.productsService.getById(id);
    if(!findProduct) throw new NotFoundException('Product not found'); 
    this.productsService.removeById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    this.productsService.create(productData);
    return { success: true };
  }
  @Put('/:id')
  updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    const findProduct = this.productsService.getById(id);
    if(!findProduct) throw new NotFoundException('Product not found'); 
    this.productsService.updateById(id, productData);
    return { success: true };
  }
}
