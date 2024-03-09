import { Product } from 'src/product/product.entity';
import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, JoinColumn, ManyToMany} from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => User, (user) => user.products, {
  //     cascade: true,
  //     eager: true
  // })
  // @JoinColumn()
  // user: User;
  @ManyToMany((type) => Product, (product) => product.categories, {
    cascade: true,
  })
  @JoinTable({
    name: 'category_products',
    joinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}