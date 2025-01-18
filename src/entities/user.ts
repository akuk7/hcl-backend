import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';

@ObjectType("Users")
@Entity('users')
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ length: 255 })
    name: string;

    @Field()
    @Column({ length: 255, unique: true })
    email: string;

    @Field()
    @Column({ length: 50 })
    role: string;

    @Field()
    @Column()
    password: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    crcId: number;
}
