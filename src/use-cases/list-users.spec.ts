import { InMemoryUsersServices } from "../services/in-memory/in-memory-users-services"
import { ListUsersUseCase } from "./list-users"

let usersServices: InMemoryUsersServices
let sut: ListUsersUseCase

describe('List users use case', () => {
    beforeEach(() => {
        usersServices = new InMemoryUsersServices()
        sut = new ListUsersUseCase(usersServices)
    })

    it('should be able to list users', async () => {
        usersServices.users.push({
            id: 'test-1-id',
            name: 'John Doe',
            email: 'john@john.com',
            password: "javascript",
            created_at: new Date()
        })

        usersServices.users.push({
            id: 'test-2-id',
            name: 'John Doo',
            email: 'doo@doo.com',
            password: "doodoo",
            created_at: new Date()
        })

        const { users } = await sut.execute({
            page: 1
        })

        expect(users).toEqual([
            expect.objectContaining({
                id: expect.any(String),
                name: 'John Doe',
                email: 'john@john.com',
            }),
            expect.objectContaining({
                id: expect.any(String),
                name: 'John Doo',
                email: 'doo@doo.com',
            })
        ])
    })

    it ('should be able to fetch paginated users', async () => {
        for(let i = 1; i <= 12; i++) {
            usersServices.users.push({
                id: `test-${i}` ,
                name: `test-name-${i}`,
                email: `test@test.com`,
                password: `testest`,
                created_at: new Date()
            })
        }

        const { users } = await sut.execute({
            page: 2
        })

        expect(users).toHaveLength(2)
        expect(users).toEqual([
            expect.objectContaining({
                id: 'test-11',
                name: 'test-name-11',
            }),
            expect.objectContaining({
                id: 'test-12',
                name: 'test-name-12',
            })
        ])
    })

    it ('should be able to search users', async () => {
        usersServices.users.push({
            id: 'test-1-id',
            name: 'JavaScript',
            email: 'javascript@javascript.com',
            password: "javascript",
            created_at: new Date()
        })

        usersServices.users.push({
            id: 'test-2-id',
            name: 'React',
            email: 'react@react.com',
            password: "reactjs",
            created_at: new Date()
        })

        usersServices.users.push({
            id: 'test-3-id',
            name: 'Node',
            email: 'node@node.com',
            password: "nodejs",
            created_at: new Date()
        })

        const { users } = await sut.execute({
            page: 1,
            search: 'javascript'
        })

        expect(users).toHaveLength(1)
        expect(users).toEqual([
            expect.objectContaining({
                id: 'test-1-id',
                name: 'JavaScript'
            })
        ])
    })
}) 