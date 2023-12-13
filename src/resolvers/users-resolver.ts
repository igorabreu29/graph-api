import { Query, Mutation, Arg } from "type-graphql"

import { CreateUserInput } from "../dto/inputs/create-user-input"
import { User } from "../dto/models/user-model"
import { UpdateUserInput } from "../dto/inputs/update-user-input"
import { prisma } from "../lib/prisma"

export class UsersResolver {
    public users: User[] = []

    @Query(() => [User])
    async list() {
        const users = await prisma.user.findMany()

        return users
    }

    @Mutation(() => User)
    async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput) {
        const { email, password, name } = data

        const user = await prisma.user.create({
            data: {
                email,
                password,
                name
            }
        })

        return user
    }

    @Mutation(() => User) 
    async update(
        @Arg('id', () => String!) id: string,
        @Arg('data', () => UpdateUserInput) data: UpdateUserInput
        ) {
            const { email, name, password } = data

            const user = prisma.user.update({
                where: {
                    id,
                },

                data: {
                    name,
                    email,
                    password,
                }
            })

            return user
    }
    
    @Mutation(() => String)
    async delete(
        @Arg('id', () => String!) id: string
    ) {
        await prisma.user.delete({
            where: {
                id
            }
        })

        return 'User deleted with success.'
    }
}