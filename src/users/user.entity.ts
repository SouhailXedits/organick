import { Product } from 'src/product/product.entity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, JoinColumn} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Column({ nullable: true })
  image: string;

  @Column({default: 0})
  balance: number;
}
