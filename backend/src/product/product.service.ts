// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { UserService } from 'src/user/user.service';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';

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
    product.creator = user;

    return await this.productRepository.save(product);
  }
  async getAllProducts(
    userName: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    const user = await this.userService.findByUsername(userName);
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder
      .where({ creator: Not(user.id) })
      .orderBy('product.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto, user);
  }
  async getSingleProduct(productId: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id: productId },
    });
  }
  async buyProduct(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.status = 'sold';

    await this.productRepository.update(productId, { status: 'sold' });
    return product;
  }
}
