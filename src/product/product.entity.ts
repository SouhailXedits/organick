import { User } from 'src/users/user.entity';
import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, JoinColumn} from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
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
}