import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product) => product.inventory, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  @Column({ default: 0 })
  quantityOnHand: number;

  @Column({ default: 0 })
  reorderLevel: number;

  @Column({ nullable: true })
  warehouseLocation: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
