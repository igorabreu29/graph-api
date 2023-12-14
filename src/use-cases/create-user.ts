import { User } from "../dto/models/user-model"
import { UsersServices } from "../services/users-services"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor(
        private usersServices: UsersServices
    ) {}

    async execute({
        email,
        name,
        password
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const findUserByEmail = await this.usersServices.findByEmail(email)

        if (findUserByEmail) {
            throw new Error('User already exist.')
        }

        const findUserByName = await this.usersServices.findByName(name)

        if (findUserByName) {
            throw new Error('User already exist.')
        }

        const data = {
            name,
            email,
            password
        }

        const user = await this.usersServices.create(data)

        return {
            user
        }
    }
}