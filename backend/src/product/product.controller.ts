// product.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PageOptionsDto } from './dto/page-options.dto';
import { MakeOfferOnProductDto } from './dto/counter-offer.dto';

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

    return this.productService.getAllProducts(user.username, pageOptionsDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSingleProduct(@Request() req, @Param('id') productId: number) {
    return this.productService.getSingleProduct(productId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/buy/:id')
  async buyProduct(@Request() req, @Param('id') productId: number) {
    return this.productService.buyProduct(productId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/makeOffer')
  async counterOfferOnProduct(
    @Request() req,
    @Body() makeOfferOnProductDto: MakeOfferOnProductDto,
  ) {
    return this.productService.makeCounterOfferOnProduct(makeOfferOnProductDto);
  }
}
