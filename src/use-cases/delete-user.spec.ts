import { InMemoryUsersServices } from "../services/in-memory/in-memory-users-services"
import { DeleteUserUseCase } from "./delete-user"

let usersServices: InMemoryUsersServices
let sut: DeleteUserUseCase

describe('Delete user use case', () => {
    beforeEach(() => {
        usersServices = new InMemoryUsersServices()
        sut = new DeleteUserUseCase(usersServices)
    })

    it ('should be able to delete user', async () => {
        usersServices.users.push({
            id: 'test-user-for-delete',
            name: 'test',
            email: 'test@test.com',
            password: "testtest",
            created_at: new Date()
        })

        const message = await sut.execute({
            id: 'test-user-for-delete'
        })
        
        expect(usersServices.users).toHaveLength(0)
        expect(message).toEqual('User deleted with success!')
    })

    it('should not be able to delete user with not existing id', async () => {
        await expect(async () => {
            await sut.execute({
                id: 'user-not-exist'
            })
        }).rejects.toBeInstanceOf(Error)
    })
}) 