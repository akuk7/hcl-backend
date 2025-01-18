import { Resolver, Mutation, Arg } from 'type-graphql';
import { Trial } from '../entities/trial';
import { TrialArgs } from '../types/trial';

@Resolver()
export class TrialResolver {

    @Mutation(() => Trial)
    async createTrial(
        @Arg('data') data: TrialArgs
    ): Promise<Trial> {
        const trial = Trial.create({
            created_by: data.created_by,
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            numberOfDoses: data.numberOfDoses
        });
        await trial.save();
        return trial;
    }
}
