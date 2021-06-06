import { v4 as uuid } from "uuid";
import {
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from "type-graphql";
import { Context } from "../../context";
import { User } from "./User";
import { hash, compare } from "bcryptjs";

@InputType()
class UserSignUpData {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class UserWithToken extends User {
  @Field()
  token: string;
}
@Resolver(User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  async findById(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<Omit<User, "email" | "password"> | null> {
    const user = await ctx.prisma.users.findUnique({ where: { id } });
    if (!user) return null;
    const { password, email, ...publicUser } = user;
    return publicUser;
  }

  @Mutation((returns) => User)
  async signUp(
    @Arg("data") data: UserSignUpData,
    @Ctx() ctx: Context
  ): Promise<Omit<User, "password">> {
    const password = await hash(data.password, 10);

    const user = await ctx.prisma.users.create({ data: { ...data, password } });
    const { password: hashedPassword, ...userWithPassword } = user;
    return userWithPassword;
  }

  @Mutation((returns) => UserWithToken, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<(Omit<User, "password"> & { token: string }) | null> {
    const user = await ctx.prisma.users.findUnique({ where: { email: email } });
    if (!user) return null;
    const validation = await compare(password, user.password);
    if (!validation) return null;

    const token = uuid();

    const expirationDate = new Date();
    expirationDate.setDate(new Date().getDate() + 1);
    await ctx.prisma.tokens.create({
      data: {
        token,
        expiresAt: expirationDate,
        user: { connect: { id: user.id } },
      },
    });

    const { password: hashedPassword, ...userWithPassword } = user;

    return { ...userWithPassword, token };
  }

  @Query((returns) => User, { nullable: true })
  async userByToken(
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const response = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!response || new Date() > response.expiresAt) return null;

    return { ...response.user };
  }
}
