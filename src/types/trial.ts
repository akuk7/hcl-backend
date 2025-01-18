import { InputType, Field, ArgsType } from 'type-graphql';

@ArgsType()
export class TrialArgs {

    @Field()
    created_by: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field()
    numberOfDoses: number;
}
