import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';

@ObjectType("Trial")
@Entity('trial')
export class Trial extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ length: 255 })
    created_by: string;

    @Field()
    @Column({ length: 255 })
    name: string;

    @Field()
    @Column({ length: 500 })
    description: string;

    @Field()
    @Column({ type: 'date' })
    startDate: string;

    @Field()
    @Column({ type: 'date' })
    endDate: string;

    @Field()
    @Column()
    numberOfDoses: number;
}
