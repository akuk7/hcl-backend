import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { Participant } from '../entities/participant';
import { ParticipantArgs } from '../types/participant'; // Assuming you define the ParticipantArgs input type
import { MyContext } from '../types/context'; // This should be your context type
import { Trial } from 'src/entities/trial';

@Resolver()
export class ParticipantResolver {

  @Mutation(() => Participant)
  async createParticipant(
    @Arg('data') data: ParticipantArgs,
    @Ctx() { user }: MyContext // Getting crc_id from the context
  ): Promise<Participant> {
    // Check if crc_id exists in the context (usually done through authentication)
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Find the associated trial
    const trial = await Trial.findOne({where:{id:data.trialId}});
    if (!trial) {
      throw new Error("Trial not found.");
    }

    // Create and save the participant
    const participant = Participant.create({
      crc_id:user.id,
      trial,
      name: data.name,
      dob: data.dob,
      gender: data.gender,
      marital_status: data.marital_status,
      address: data.address,
      postal_code: data.postal_code,
      phone_number: data.phone_number,
      email: data.email,
      employement_status: data.employement_status,
      occupation: data.occupation,
      education: data.education,
      ethnicity: data.ethnicity,
      nationality: data.nationality,
      primary_languages: data.primary_languages,
      health_status: data.health_status
    });

    await participant.save();
    return participant;
  }
}
