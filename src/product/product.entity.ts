import { Category } from 'src/category/category.entity';
import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany} from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  original_price: number;

  @Column()
  discount: number;

  @Column()
  description: string;

  @Column()
  image: string;

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
  @ManyToMany((type) => Category, {
    eager: true,
  })
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}