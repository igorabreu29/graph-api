import { InMemoryUsersServices } from "../services/in-memory/in-memory-users-services"
import { GetUserUseCase } from "./get-user"

let usersServices: InMemoryUsersServices
let sut: GetUserUseCase

describe('Get user use case', () => {
    beforeEach(() => {
        usersServices = new InMemoryUsersServices()
        sut = new GetUserUseCase(usersServices)
    })

    it ('should be able to get user', async () => {
        usersServices.users.push({
            id: 'test-user',
            name: 'test',
            email: 'test@test.com',
            password: "testtest",
            created_at: new Date()
        })

        const { user } = await sut.execute({
            id: 'test-user'
        })

        expect(user).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: 'test'
            })
        )
    })

    it ('should not be able to get user with not existing id', async () => {
        await expect(async () => {
            await sut.execute({
                id: 'user-not-exist'
            })
        }).rejects.toBeInstanceOf(Error)
    })
}) 