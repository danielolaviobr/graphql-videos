import "reflect-metadata";
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
} from "type-graphql";
import { Video } from "./Video";
import { Context } from "../../context";
import { Author } from "../authors/Author";

@InputType()
class VideoCreateInput {
	@Field()
	title: string;

	@Field()
	description: string;

	@Field()
	url: string;

	@Field({ nullable: true })
	createdAt: Date;
}

@Resolver(Video)
export class VideoResolver {
	@FieldResolver()
	author(@Root() video: Video, @Ctx() ctx: Context): Promise<Author | null> {
		return ctx.prisma.videos.findUnique({ where: { id: video.id } }).author();
	}

	@Query((returns) => Video, { nullable: true })
	async videoById(
		@Arg("id") id: string,
		@Ctx() ctx: Context
	): Promise<Video | null> {
		return ctx.prisma.videos.findUnique({ where: { id } });
	}

	@Query((returns) => [Video])
	async videos(@Ctx() ctx: Context): Promise<Video[] | null> {
		return ctx.prisma.videos.findMany();
	}

	@Mutation((returns) => Video)
	async createVideo(
		@Arg("data") data: VideoCreateInput,
		@Ctx() ctx: Context
	): Promise<Video> {
		const video = await ctx.prisma.videos.create({
			data: {
				...data,
				createdAt: data.createdAt || new Date(),
			},
		});

		return video;
	}
}
