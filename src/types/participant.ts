import { InputType, Field } from 'type-graphql';

@InputType()
export class ParticipantArgs {
  @Field()
  trialId: string;

  @Field()
  name: string;

  @Field()
  dob: string;

  @Field()
  gender: string;

  @Field()
  marital_status: string;

  @Field()
  address: string;

  @Field()
  postal_code: string;

  @Field()
  phone_number: string;

  @Field()
  email: string;

  @Field()
  employement_status: string;

  @Field()
  occupation: string;

  @Field()
  education: string;

  @Field()
  ethnicity: string;

  @Field()
  nationality: string;

  @Field()
  primary_languages: string;

  @Field()
  health_status: string;
}
