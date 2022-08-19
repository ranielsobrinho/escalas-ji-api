import { LoadAccounts } from '../../../../domain/usecases/account/load-accounts'
import { AccountModel } from '../../login/login/login-controller-protocols'
import { LoadAccountsController } from './load-accounts-controller'

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

describe('LoadAccountsController', () => {
  test('Should call LoadAccounts', async () => {
    class LoadAccountsStub implements LoadAccounts {
      async load(): Promise<AccountModel[]> {
        return Promise.resolve(makeFakeAccounts())
      }
    }
    const loadAccountsStub = new LoadAccountsStub()
    const loadAccountsSpy = jest.spyOn(loadAccountsStub, 'load')
    const sut = new LoadAccountsController(loadAccountsStub)
    await sut.handle({})
    expect(loadAccountsSpy).toHaveBeenCalled()
  })
})
