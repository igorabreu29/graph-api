import { PrismaUsersServices } from "../../services/prisma/prisma-users-services";
import { ListUsersUseCase } from "../list-users";

export function makeListUsersUseCase() {
    const usersServices = new PrismaUsersServices()
    const useCase = new ListUsersUseCase(usersServices)

    return useCase
}