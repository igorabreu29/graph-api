import "reflect-metadata"

import { ApolloServer, } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone'
import { UsersResolver } from "./resolvers/users-resolver";

async function main() {
    const schema = await buildSchema({
        resolvers: [UsersResolver]
    })

    const server = new ApolloServer({ schema })

    const { url } = await startStandaloneServer(server, { listen: { port: 4000 }})
    console.log(`HTTP Server Running on: ${url}`)
}
main()