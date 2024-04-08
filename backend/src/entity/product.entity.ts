import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Offer } from './offer.entity'; // Make sure Offer entity is imported

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

  @Column('json', { nullable: true })
  images: string[];

  @Column({ default: 'Available' })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @JoinTable() // Assuming there's a user_id column in the Product table
  @ManyToOne(() => User, (user) => user.id)
  creator: User;

  // @OneToOne(() => Offer, (offer) => offer.id) // Corrected relationship definition
  // offers: Offer[]; // Ensure this matches the Offer entity definition
}
