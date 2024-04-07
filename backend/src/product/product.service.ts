// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'src/entity/product.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  async create(
    userName: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const user = await this.userService.findByUsername(userName);
    const product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.description = createProductDto.description;
    product.images = createProductDto.images;
    product.user = user;

    return await this.productRepository.save(product);
  }
}
