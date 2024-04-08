// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'src/entity/product.entity';
import { UserService } from 'src/user/user.service';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { MakeOfferOnProductDto } from './dto/counter-offer.dto';
import { Offer } from 'src/entity/offer.entity';

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
      .where({ creator: user.id })
      .orderBy('product.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
    console.log(product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.status = 'sold';

    return await this.productRepository.save(product);
  }
  async makeCounterOfferOnProduct(
    makeOfferOnProductDto: MakeOfferOnProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: Number(makeOfferOnProductDto.productId) },
    });
    console.log(product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const offer = new Offer();
    offer.price = makeOfferOnProductDto.price;
    offer.product_id = makeOfferOnProductDto.productId;

    product.offers = [...product.offers, offer];

    return await this.productRepository.save(product);
  }
}
