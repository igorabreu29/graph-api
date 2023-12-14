import { PrismaUsersServices } from "../../services/prisma/prisma-users-services";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
    const usersServices = new PrismaUsersServices()
    const useCase = new CreateUserUseCase(usersServices)

    return useCase
}