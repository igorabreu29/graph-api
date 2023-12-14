import { PrismaUsersServices } from "../../services/prisma/prisma-users-services";
import { DeleteUserUseCase } from "../delete-user";

export function makeDeleteUserUseCase() {
    const usersServices = new PrismaUsersServices()
    const useCase = new DeleteUserUseCase(usersServices)

    return useCase
}