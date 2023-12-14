import { CreateUserInput } from "../dto/inputs/create-user-input";
import { UpdateUserInput } from "../dto/inputs/update-user-input";
import { User } from "../dto/models/user-model";

export interface UsersServices {
    findMany: (page: number, search?: string) => Promise<User[]>
    findById: (id: string) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
    findByName: (email: string) => Promise<User | null>
    create: (data: CreateUserInput) => Promise<User>
    update: (data: UpdateUserInput, id: string) => Promise<User | null>
    delete: (id: string) => Promise<String>
}