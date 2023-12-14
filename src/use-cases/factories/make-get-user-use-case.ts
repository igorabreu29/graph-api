import { PrismaUsersServices } from "../../services/prisma/prisma-users-services";
import { GetUserUseCase } from "../get-user";

export function makeGetUserUseCase() {
    const usersServices = new PrismaUsersServices()
    const useCase = new GetUserUseCase(usersServices)

    return useCase
}