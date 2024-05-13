import {
  Controller,
  Get,
  Param,
  Request,
  Body,
  UseGuards,
  Post,
  Query,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { User } from 'src/entity/user.entity';
import { MakeOfferOnProductDto } from './dto/make-offer-on-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/product/dto/page-options.dto';
import { PageDto } from 'src/product/dto/page.dto';
import { Offer } from 'src/entity/offer.entity';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getAllOffers(
    @Request() req,
    @Param('id') id: number,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Offer>> {
    const user = req.user;

    return this.offerService.getAllOffers(
      user.username,
      String(id),
      pageOptionsDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/makeOffer')
  async counterOfferOnProduct(
    @Request() req,
    @Body() makeOfferOnProductDto: MakeOfferOnProductDto,
  ) {
    const user = req.user;

    return this.offerService.makeCounterOfferOnProduct(
      user.username,
      makeOfferOnProductDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/accept-offer/:id')
  async acceptOffer(@Request() req, @Param('id') productId: number) {
    const user = req.user;
    return this.offerService.acceptOffer(user.username, String(productId));
  }
}
