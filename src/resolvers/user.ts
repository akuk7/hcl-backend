import { Resolver, Mutation, Args, Ctx, Query } from 'type-graphql';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/user';  
import { LoginArgs, RegisterArgs, VerifyEmailArgs } from '../types/user'; 
import { Response } from 'express';

export interface MyContext {
  res: Response;
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async login(@Args() args: LoginArgs, @Ctx() { res }: MyContext){
      const user = await User.findOne({ where: { email: args.email } });
      if (!user) throw new Error('Account Not Found');
    
      const isPasswordValid = await bcrypt.compare(args.password, user.password);
      if (!isPasswordValid) throw new Error('Invalid Credentials');
    
      const payload = { userId: user.id, role: user.role };
      const token = sign(payload, String(process.env.JWT_SECRET), { expiresIn: '1d' });
    
      res.cookie('token', token, { httpOnly: true, secure: true });
      return user;
    }
    



  @Mutation(() => User)
  async register(@Args() args: RegisterArgs): Promise<User> {
    const existingUser = await User.findOne({ where: { email: args.email } });
    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const newUser = User.create({
      name: args.name,
      email: args.email,
      password: hashedPassword,
      role:"Aspiring-CRC"
    });

    await newUser.save();
    return newUser;
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args() args: VerifyEmailArgs): Promise<boolean> {
    const user = await User.findOne({ where: { email: args.email } });
    if (!user) throw new Error('Account Not Found');

    user.crcId = args.crcId; 
    await user.save();

    return true;
  }

  @Query(() => String, { nullable: true })
  dummy(): string {
    return "Server is running";
  }
}

