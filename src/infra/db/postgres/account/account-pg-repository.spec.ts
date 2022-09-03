import { AccountPgRepository } from './account-pg-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'

import { PrismaClient } from '@prisma/client'

const makeFakeAddAccountModel = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  isAdmin: false
})

describe('AccountPgRepository', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  beforeEach(async () => {
    await prisma.users.deleteMany({ where: { email: 'valid_email@mail.com' } })
    await prisma.users.deleteMany({ where: { email: 'other_email@mail.com' } })
    await prisma.users.deleteMany({
      where: { email: 'other_valid_email@mail.com' }
    })
    await prisma.users.deleteMany({ where: { email: 'any_email@mail.com' } })
  })

  afterAll(async () => {
    await prisma.users.deleteMany({ where: { email: 'other_email@mail.com' } })
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
          password: 'hashed_password',
          isadmin: false
        }
      })
      const account = await sut.loadByEmail('valid_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@mail.com')
      expect(account.password).toBe('hashed_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('invalid_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('Should return true if loadById succeeds', async () => {
      const sut = makeSut()
      const res = await prisma.users.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password',
          isadmin: false
        }
      })
      const account = await sut.loadById(res.id.toString())
      expect(account).toBeTruthy()
    })

    test('Should return false if loadById fails', async () => {
      const sut = makeSut()
      const account = await sut.loadById('-1')
      expect(account).toBeFalsy()
    })
  })

  describe('load()', () => {
    test('Should return accounts if load succeeds', async () => {
      const sut = makeSut()
      await prisma.users.createMany({
        data: [
          {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'hashed_password',
            isadmin: false
          },
          {
            name: 'other_name',
            email: 'other_email@mail.com',
            password: 'hashed_password',
            isadmin: false
          }
        ]
      })
      const account = await sut.load()
      expect(account).toBeTruthy()
    })
  })
})
