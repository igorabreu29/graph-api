import { PrismaUsersServices } from "../../services/prisma/prisma-users-services";
import { UpdateUserUseCase } from "../update-user";

export function makeUpdateUserUseCase() {
    const usersServices = new PrismaUsersServices()
    const useCase = new UpdateUserUseCase(usersServices)

    return useCase
}