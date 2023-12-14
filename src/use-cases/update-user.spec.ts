import { InMemoryUsersServices } from "../services/in-memory/in-memory-users-services"
import { UpdateUserUseCase } from "./update-user"

let usersServices: InMemoryUsersServices
let sut: UpdateUserUseCase

describe('Update user use case', () => {
    beforeEach(() => {
        usersServices = new InMemoryUsersServices()
        sut = new UpdateUserUseCase(usersServices)
    })

    it ('should be able to update user', async () => {
        const createdUser = await usersServices.create({
            name: 'test',
            email: 'test@test.com',
            password: 'testtest'
        })

        const { user } = await sut.execute({
            id: createdUser.id,
            data: {
                name: 'testUpdated',
                email: 'update@update.com',
                password: 'updated'
            },
        })

        expect(user).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: 'testUpdated',
                email: 'update@update.com',
                password: 'updated',
                created_at: expect.any(Date)
            })
        )
    })
}) 