import { Query, Mutation, Arg } from "type-graphql"
import { randomUUID } from "node:crypto"

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

        const user: User = {
            id: randomUUID(),
            name, 
            email,
            password,
            created_at: new Date()
        }

        this.users.push(user)
        return user
    }

    @Mutation(() => User) 
    async update(
        @Arg('id', () => String!) id: string,
        @Arg('data', () => UpdateUserInput) data: UpdateUserInput
        ) {
        const findIndexUserById = this.users.findIndex(user => {
            return user.id === id
        })

        if (findIndexUserById < 0) {
            throw new Error('User Not Found.')
        }

        const { email, name, password } = data
        
        this.users[findIndexUserById].id = id
        this.users[findIndexUserById].email = email
        this.users[findIndexUserById].password = password
        this.users[findIndexUserById].name = name

        return this.users[findIndexUserById]
    }
    
    @Mutation(() => String)
    async delete(
        @Arg('id', () => String!) id: string
    ) {
        const findIndexUserById = this.users.findIndex(user => user.id === id)

        if (findIndexUserById < 0) {
            throw new Error('User Not Found.')
        }

        this.users.splice(findIndexUserById, 1)

        return 'User deleted with success.'
    }
}