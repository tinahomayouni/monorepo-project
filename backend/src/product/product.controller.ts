// product.controller.ts
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('register-product')
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const user = req.user;
    console.log(user, 'user');
    console.log(createProductDto, 'createProductDto');

    return this.productService.create(user, createProductDto);
  }
}
