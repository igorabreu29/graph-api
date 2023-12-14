import { InMemoryUsersServices } from "../services/in-memory/in-memory-users-services"
import { CreateUserUseCase } from "./create-user"

let usersServices: InMemoryUsersServices
let sut: CreateUserUseCase

describe('Create user use case', () => {
    beforeEach(() => {
        usersServices = new InMemoryUsersServices()
        sut = new CreateUserUseCase(usersServices)
    })

    it ('should be able to create user', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'john@john.com',
            password: 'johnjohn'
        })

        expect(user).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: 'John Doe'
            })
        )
    })

    it ('should not be able to create user with equals email', async () => {
        usersServices.create({
            name: 'John1',
            email: 'john@john.com',
            password: 'johnjohn'
        })

        await expect(async () => {
            await sut.execute({
                name: 'John2',
                email: 'john@john.com',
                password: 'johnjohn'
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it ('should not be able to create user with equals name', async () => {
        usersServices.create({
            name: 'John',
            email: 'john1@john.com',
            password: 'johnjohn'
        })

        await expect(async () => {
            await sut.execute({
                name: 'John',
                email: 'john2@john.com',
                password: 'johnjohn'
            })
        }).rejects.toBeInstanceOf(Error)
    })
}) 