import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity'; // Make sure Product entity is imported

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: string;

  @Column()
  price: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  // relationships
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @OneToOne(() => Product, (product) => product.id)
  product: Product;
}
