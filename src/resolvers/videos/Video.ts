import "reflect-metadata";
import { Field, ObjectType, ID } from "type-graphql";
import { Author } from "../authors/Author";

@ObjectType()
export class Video {
	@Field((type) => ID)
	id: string;

	@Field((type) => Date)
	createdAt: Date;

	@Field((type) => String)
	title: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String)
	url: string;

	@Field((type) => Author, { nullable: true })
	author?: Author | null;
}
