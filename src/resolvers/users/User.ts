import { IsEmail } from "class-validator";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  password: string;

  @Field((type) => Number)
  age: number | null;
}
