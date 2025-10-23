import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fipeCode: string

    @Column()
    brand: string

    @Column()
    model: string

    @Column({nullable: true})
    version: string

    @Column()
    year: number

    @Column({ nullable: true })
    plate?: string;

    @Column()
    fuel: string

    @Column('decimal', {precision: 10, scale: 2})
    price: number

    @Column()
    mileage: number

    @Column({ nullable: true })
    color: string;

    @Column({ nullable: true })
    description: string;

    @Column('simple-array', { nullable: true })
    images: string[];

    @Column({ default: true })
    active: boolean

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
