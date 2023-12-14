import { UpdateUserInput } from "../dto/inputs/update-user-input"
import { User } from "../dto/models/user-model"
import { UsersServices } from "../services/users-services"

interface UpdateUserUseCaseRequest {
    id: string
    data: UpdateUserInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(
        private usersServices: UsersServices
    ) {}

    async execute({
        id,
        data
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersServices.update(data, id)

        if (!user) {
            throw new Error('User not found.')
        }

        return {
            user,
        }
    }
}