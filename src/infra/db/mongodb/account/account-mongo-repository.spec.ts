import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

import { Collection, ObjectId } from 'mongodb'

let accountCollection: Collection
describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        isAdmin: false
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('valid_name')
      expect(account.email).toEqual('valid_email@mail.com')
      expect(account.password).toEqual('valid_password')
      expect(account.isAdmin).toEqual(false)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        isAdmin: false
      })
      const account = await sut.loadByEmail('valid_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('valid_name')
      expect(account.email).toEqual('valid_email@mail.com')
      expect(account.password).toEqual('valid_password')
      expect(account.isAdmin).toEqual(false)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('valid_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
})
