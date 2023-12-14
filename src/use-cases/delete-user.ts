import { User } from "../dto/models/user-model"
import { UsersServices } from "../services/users-services"

interface DeleteUserUseCaseRequest {
    id: string
}

export class DeleteUserUseCase {
    constructor(
        private usersServices: UsersServices
    ) {}

    async execute({
        id
    }: DeleteUserUseCaseRequest): Promise<String> {
        const user = await this.usersServices.findById(id)
        
        if (!user) {
            throw new Error('User not found.')
        }

        const message = await this.usersServices.delete(id)
        
        return message
    }
}