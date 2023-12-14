import { CreateUserInput } from "../../dto/inputs/create-user-input";
import { UpdateUserInput } from "../../dto/inputs/update-user-input";
import { prisma } from "../../lib/prisma";
import { UsersServices } from "../users-services";

export class PrismaUsersServices implements UsersServices {
    async findMany(page: number, search?: string | undefined) {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: search
                }
            },
            skip: (page - 1) * 10,
            take: page * 10
        })

        return users
    }

    async findById(id: string) {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return null
        }

        return user
    }

    async findByName(name: string) {
        const user = await prisma.user.findFirst({
            where: {
                name,
            }
        })

        if (!user) {
            return null
        }

        return user
    }

    async create(data: CreateUserInput) {
        const { name, email, password } = data

        const createdUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return createdUser
    }

    async update(data: UpdateUserInput, id: string) {
        const { name, email, password } = data

        if (!id) {
            return null
        }

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password
            }
        })

        return updatedUser
    }

    async delete(id: string) {
        await prisma.user.delete({
            where: {
                id
            }
        })

        return 'User deleted with success!'
    }
}