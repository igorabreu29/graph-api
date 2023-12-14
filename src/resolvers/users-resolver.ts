import { Query, Mutation, Arg, Args, Resolver } from "type-graphql"

import { CreateUserInput } from "../dto/inputs/create-user-input"
import { User } from "../dto/models/user-model"
import { UpdateUserInput } from "../dto/inputs/update-user-input"
import { prisma } from "../lib/prisma"
import { FilterUsersArgs } from "../dto/args/filter-users-args"
import { makeListUsersUseCase } from "../use-cases/factories/make-list-users-use-case"
import { makeGetUserUseCase } from "../use-cases/factories/make-get-user-use-case"
import { makeCreateUserUseCase } from "../use-cases/factories/make-create-user-use-case"
import { makeUpdateUserUseCase } from "../use-cases/factories/make-update-user-use-case"
import { makeDeleteUserUseCase } from "../use-cases/factories/make-delete-user-use-case"

@Resolver()
export class UsersResolver {
    @Query(() => [User])
    async list(
        @Args(() => FilterUsersArgs) { page, search  }: FilterUsersArgs
    ) {
        const useCase = makeListUsersUseCase()

        const { users } = await useCase.execute({ page, search })
        return users
    }

    @Query(() => User)
    async getUser(
        @Arg('id', () => String!) id: string
    ) {
        const useCase = makeGetUserUseCase()

        try {
            const { user } = await useCase.execute({ id })
            return user
        } catch(err) {
            return err
        }
    }

    @Mutation(() => User)
    async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput) {
        const useCase = makeCreateUserUseCase()

        try {
            const { user } = await useCase.execute(data)
            return user
        } catch(err) {
            return err
        }
    }

    @Mutation(() => User) 
    async update(
        @Arg('id', () => String!) id: string,
        @Arg('data', () => UpdateUserInput) data: UpdateUserInput
        ) {
            const useCase = makeUpdateUserUseCase()

            try {
                const { user } = await useCase.execute({
                    data, 
                    id
                })
    
                return user
            } catch(err) {
                return err
            }
    }
    
    @Mutation(() => String)
    async delete(
        @Arg('id', () => String!) id: string
    ) {
        const useCase = makeDeleteUserUseCase()

        try {
            const message = useCase.execute({ id })
            return message
        } catch(err) {
            return err
        }
    }
}