import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@/schemas/product.schema';
import { ProductFilterDto } from './dto/product-filter.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: Product) {
    return this.productService.create(product);
  }

  @Get()
  findAll(@Body() filter?: ProductFilterDto) {
    if (filter) return this.productService.findAll(filter);
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
