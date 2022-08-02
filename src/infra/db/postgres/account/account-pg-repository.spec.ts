import { AccountPgRepository } from './account-pg-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'

import { PrismaClient } from '@prisma/client'

const makeFakeAddAccountModel = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

describe('AccountPgRepository', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  afterAll(async () => {
    await prisma.users.deleteMany({})
  })

  const makeSut = (): AccountPgRepository => {
    return new AccountPgRepository(prisma)
  }

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const account = await sut.add(makeFakeAddAccountModel())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account if loadByEmail succeeds', async () => {
      const sut = makeSut()
      await prisma.users.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password'
        }
      })
      const account = await sut.loadByEmail('valid_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@mail.com')
      expect(account.password).toBe('hashed_password')
    })
  })
})
