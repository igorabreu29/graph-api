import { randomUUID } from "crypto";
import { CreateUserInput } from "../../dto/inputs/create-user-input";
import { UpdateUserInput } from "../../dto/inputs/update-user-input";
import { User } from "../../dto/models/user-model";
import { prisma } from "../../lib/prisma";
import { UsersServices } from "../users-services";

export class InMemoryUsersServices implements UsersServices {
    public users: User[] = []

    async findMany(page: number, search?: string) {
        const users = this.users.slice((page - 1) * 10, page * 10).filter(user => {
            if (search) {
                return user.name.toLowerCase().includes(search.toLowerCase())
            }

            return user
        }) 

        return users
    }

    async findById(id: string) {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async findByEmail(email: string) {
        const userExistEmail = this.users.find(user => user.email === email)

        if (!userExistEmail) {
            return null
        }

        return userExistEmail
    }

    async findByName(name: string) {
        const userExistName = this.users.find(user => user.name === name)

        if (!userExistName) {
            return null
        }

        return userExistName
    }

    async create(data: CreateUserInput) {
        const { name, email, password } = data

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

    async update(data: UpdateUserInput, id: string) {
        const { name, email, password } = data

        const findIndexUserById = this.users.findIndex(user => {
            return user.id === id
        })
        
        if (findIndexUserById < 0) {
            return null
        }

        this.users[findIndexUserById].name = name
        this.users[findIndexUserById].email = email
        this.users[findIndexUserById].password = password

        return this.users[findIndexUserById]
    }

    async delete(id: string) {
        const findIndexUserById = this.users.findIndex(user => {
            return user.id === id
        })

        this.users.splice(findIndexUserById, 1)

        return 'User deleted with success!'
    }
}