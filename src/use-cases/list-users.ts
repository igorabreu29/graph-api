import { User } from "../dto/models/user-model";
import { UsersServices } from "../services/users-services";

interface ListUsersUseCaseRequest {
    page: number
    search?: string
}

interface ListUsersUseCaseResponse {
    users: User[]
}

export class ListUsersUseCase {
    constructor(
        private usersServices: UsersServices
    ) {}

    async execute({
        page,
        search
    }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersServices.findMany(page, search)

        return {
            users
        }
    }
}