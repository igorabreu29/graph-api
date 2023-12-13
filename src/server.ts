import "reflect-metadata"

import { ApolloServer, } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone'
import { UsersResolver } from "./resolvers/users-resolver";
import { env } from "./env";

async function main() {
    const schema = await buildSchema({
        resolvers: [UsersResolver]
    })

    const server = new ApolloServer({ schema })

    const { url } = await startStandaloneServer(server, { listen: { port: env.PORT }})
    console.log(`HTTP Server Running on: ${url}`)
}
main()