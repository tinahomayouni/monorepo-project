// product.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PageOptionsDto } from './dto/page-options.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const user = req.user;

    return this.productService.create(user.username, createProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllProducts(
    @Request() req,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const user = req.user;

    return this.productService.getAll(user.username, pageOptionsDto);
  }
}
