// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/entity/offer.entity';
import { PageMetaDto } from 'src/product/dto/page-meta.dto';
import { PageDto } from 'src/product/dto/page.dto';
import { Repository } from 'typeorm';
import { MakeOfferOnProductDto } from './dto/make-offer-on-product.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { PageOptionsDto } from 'src/product/dto/page-options.dto';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(user: Partial<Offer>): Promise<Offer> {
    return this.offerRepository.save(user);
  }
  async getAllOffers(
    userName: string,
    productId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Offer>> {
    const user = await this.userService.findByUsername(userName);

    const queryBuilder = this.offerRepository.createQueryBuilder('offer');

    queryBuilder
      .where({ product_id: productId })
      .orderBy('offer.created_at', pageOptionsDto.order)
      .skip(0)
      .take(10);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto, user);
  }
  async makeCounterOfferOnProduct(
    userName: string,

    makeOfferOnProductDto: MakeOfferOnProductDto,
  ): Promise<Offer> {
    const product = await this.productService.getSingleProduct(
      Number(makeOfferOnProductDto.productId),
    );
    const user = await this.userService.findByUsername(userName);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const offer = new Offer();
    offer.product_id = makeOfferOnProductDto.productId;
    offer.price = makeOfferOnProductDto.price;
    offer.user = user.id;
    offer.creator_id = String(user.id);
    return await this.offerRepository.save(offer);
  }
  async acceptOffer(userName: string, productId: string): Promise<Product> {
    const product = await this.productService.getSingleProduct(
      Number(productId),
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.status = 'reserved';

    await this.productService.updateProduct(productId, product);
    return product;
  }
}
