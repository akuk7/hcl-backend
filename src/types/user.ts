import { InputType, Field, ArgsType } from 'type-graphql';

// Login Input Arguments
@ArgsType()
export class LoginArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}

// Register Input Arguments
@ArgsType()
export class RegisterArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

}

// Verify Email Input Arguments
@ArgsType()
export class VerifyEmailArgs {
  @Field()
  email: string;

  @Field()
  crcId: number;
}
