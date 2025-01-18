import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Trial } from './trial'; // assuming 'Trial' is the entity where the trial information is stored

@ObjectType("Participant")
@Entity('participant')
export class Participant extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ length: 255 })
  crc_id: string; // This is the user ID who added the participant

  @Field()
  @ManyToOne(() => Trial)
  @JoinColumn({ name: 'trialId' })
  trial: Trial; // Assuming each participant belongs to a trial

  @Field()
  @Column({ length: 255 })
  name: string;

  @Field()
  @Column()
  dob: string; // Date of Birth

  @Field()
  @Column({ length: 10 })
  gender: string; // Gender (e.g., "Male", "Female", etc.)

  @Field()
  @Column({ length: 20 })
  marital_status: string; // Marital status (e.g., "Single", "Married")

  @Field()
  @Column({ length: 500 })
  address: string;

  @Field()
  @Column({ length: 10 })
  postal_code: string;

  @Field()
  @Column({ length: 15 })
  phone_number: string;

  @Field()
  @Column({ length: 255 })
  email: string;

  @Field()
  @Column({ length: 50 })
  employement_status: string; // Employment status (e.g., "Employed", "Unemployed")

  @Field()
  @Column({ length: 100 })
  occupation: string;

  @Field()
  @Column({ length: 100 })
  education: string;

  @Field()
  @Column({ length: 50 })
  ethnicity: string;

  @Field()
  @Column({ length: 50 })
  nationality: string;

  @Field()
  @Column({ length: 100 })
  primary_languages: string;

  @Field()
  @Column({ length: 100 })
  health_status: string;
}
