import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { buildSchema } from "type-graphql";
import { VideoResolver } from "./resolvers/videos/VideoResolver";
import { UserResolver } from "./resolvers/users/UserResolver";

const app = async () => {
  const schema = await buildSchema({
    resolvers: [VideoResolver, UserResolver],
  });

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log("Server is running 🚀")
  );
};

app();
