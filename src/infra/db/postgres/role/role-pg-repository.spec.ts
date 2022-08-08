import { PrismaClient } from '@prisma/client'
import { RolePgRepository } from './role-pg-repository'

describe('RolePgRepository', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  beforeEach(async () => {
    await prisma.users.deleteMany({ where: { email: 'valid_email@mail.com' } })
    await prisma.role.deleteMany({ where: { name: 'any_role' } })
  })

  describe('add()', () => {
    test('Should return a new role on success', async () => {
      const sut = new RolePgRepository(prisma)
      const account = await prisma.users.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password',
          isadmin: false
        }
      })
      const role = await sut.add('any_role', account.id.toString())
      expect(role).toBeTruthy()
      expect(role.id).toBeTruthy()
      expect(role.name).toBe('any_role')
      expect(role.userId).toBe(account.id.toString())
    })
  })
})
