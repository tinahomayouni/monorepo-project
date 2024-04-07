import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column('json', { nullable: true }) // Assuming images will be stored as JSON
  images: string[]; // Or adjust the type as per your storage method

  @Column({ default: 'Available' })
  status: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}
