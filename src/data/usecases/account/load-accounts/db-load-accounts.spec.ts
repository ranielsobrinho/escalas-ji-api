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

describe('DbLoadAccounts', () => {
  test('Should call LoadAccountsRepository', async () => {
    class LoadAccountsRepositoryStub implements LoadAccountsRepository {
      async load(): Promise<AccountModel[]> {
        return Promise.resolve(makeFakeAccounts())
      }
    }
    const loadAccountsRepositoryStub = new LoadAccountsRepositoryStub()
    const sut = new DbLoadAccounts(loadAccountsRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountsRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})
