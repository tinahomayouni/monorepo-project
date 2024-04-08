import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Offer } from './offer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}
