import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const videos: Prisma.videosCreateInput[] = [
	{
		title: "Visual Studio Code Crash Course",
		url: "https://www.youtube.com/watch?v=WPqXP_kLzpo&ab_channel=freeCodeCamp.orgfreeCodeCamp.orgVerified",
		description:
			"Visual Studio Code (VS Code) is a free code editor made by Microsoft. In this course you will learn how to use this popular code editor. You will also learn tips and tricks to make it even easier to use.",
		createdAt: new Date(2020, 6),
		author: {
			connectOrCreate: {
				create: { name: "freeCodeCamp.org", age: 20 },
				where: { name: "freeCodeCamp.org" },
			},
		},
	},
	{
		title: "React Typescript Tutorial",
		url: "https://www.youtube.com/watch?v=Z5iWr6Srsj8&t=162s&ab_channel=BenAwad",
		description:
			"Learn how to start using Typescript in your React code. I go over props, hooks, and render props.",
		createdAt: new Date(2020, 5),
		author: {
			connectOrCreate: {
				create: { name: "Ben Awad", age: 25 },
				where: { name: "Ben Awad" },
			},
		},
	},
	{
		title: "Speedrunning AP CS Principles Exam",
		url: "https://www.youtube.com/watch?v=8-ZdZ7vswn0&t=30s&ab_channel=BenAwadBenAwadVerified",
		description: "Am I smarter than a highschool/college student?",
		createdAt: new Date(2021, 3),
		author: {
			connectOrCreate: {
				create: { name: "Ben Awad", age: 25 },
				where: { name: "Ben Awad" },
			},
		},
	},
	{
		title: "Learn Python - Full Course for Beginners [Tutorial]",
		url: "https://www.youtube.com/watch?v=rfscVS0vtbw&ab_channel=freeCodeCamp.orgfreeCodeCamp.orgVerified",
		description:
			"This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you'll be a python programmer in no time!",
		createdAt: new Date(2018),
		author: {
			connectOrCreate: {
				create: { name: "freeCodeCamp.org", age: 20 },
				where: { name: "freeCodeCamp.org" },
			},
		},
	},
	{
		title:
			"Como Eu Programo e Hospedo Sites da Forma Mais Moderna que Existe [GUIA DEFINITIVO]",
		url: "https://www.youtube.com/watch?v=EW7m2WIvFgQ&t=102s&ab_channel=FilipeDeschamps",
		description:
			"NÃO EXISTE UM VÍDEO COM TANTO CONHECIMENTO CONSOLIDADO EM UM ÚNICO LUGAR NESSE CANAL",
		createdAt: new Date(2021, 4),
		author: {
			connectOrCreate: {
				create: { name: "Filipe Deschamps", age: 32 },
				where: { name: "Filipe Deschamps" },
			},
		},
	},
];

async function main() {
	console.log(`Start seeding ...`);
	for (const video of videos) {
		const user = await prisma.videos.create({
			data: video,
		});
		console.log(`Created video with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
