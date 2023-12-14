import { User } from "../dto/models/user-model"
import { UsersServices } from "../services/users-services"

interface GetUserUseCaseRequest {
    id: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserUseCase {
    constructor(
        private usersServices: UsersServices
    ) {}

    async execute({
        id
    }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersServices.findById(id)
        
        if (!user) {
            throw new Error('User not found.')
        }
        
        return {
            user
        }
    }
}