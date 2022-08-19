import { LoadAccountsRepository } from '../../../protocols/db/account/load-accounts-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccounts } from './db-load-accounts'

const makeFakeAccounts = (): AccountModel[] => {
  return [
    {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
      isAdmin: false
    },
    {
      id: 'other_id',
      name: 'other_name',
      email: 'other_email@mail.com',
      password: 'hashed_password',
      isAdmin: false
    }
  ]
}

const makeFakeLoadAccounts = (): LoadAccountsRepository => {
  class LoadAccountsRepositoryStub implements LoadAccountsRepository {
    async load(): Promise<AccountModel[]> {
      return Promise.resolve(makeFakeAccounts())
    }
  }
  return new LoadAccountsRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccounts
  loadAccountsRepositoryStub: LoadAccountsRepository
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositoryStub = makeFakeLoadAccounts()
  const sut = new DbLoadAccounts(loadAccountsRepositoryStub)
  return {
    sut,
    loadAccountsRepositoryStub
  }
}

describe('DbLoadAccounts', () => {
  test('Should call LoadAccountsRepository', async () => {
    const { sut, loadAccountsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountsRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})
