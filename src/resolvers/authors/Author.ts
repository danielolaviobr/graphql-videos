import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";
import { Video } from "../videos/Video";

@ObjectType()
export class Author {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => Number)
	age: number;

	@Field((type) => [Video])
	videos?: [Video];
}
