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
  async getAll() {
    return this.productsService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }

  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    this.productsService.create(productData);
    return { success: true };
  }
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productsService.updateById(id, productData);
    return { success: true };
  }
}
