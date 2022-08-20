import { LoadAccounts } from '../../../../domain/usecases/account/load-accounts'
import { serverError } from '../../../helpers/http-helper'
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

const makeFakeLoadAccounts = (): LoadAccounts => {
  class LoadAccountsStub implements LoadAccounts {
    async load(): Promise<AccountModel[]> {
      return Promise.resolve(makeFakeAccounts())
    }
  }
  return new LoadAccountsStub()
}

type SutTypes = {
  sut: LoadAccountsController
  loadAccountsStub: LoadAccounts
}

const makeSut = (): SutTypes => {
  const loadAccountsStub = makeFakeLoadAccounts()
  const sut = new LoadAccountsController(loadAccountsStub)
  return {
    sut,
    loadAccountsStub
  }
}

describe('LoadAccountsController', () => {
  test('Should call LoadAccounts', async () => {
    const { sut, loadAccountsStub } = makeSut()
    const loadAccountsSpy = jest.spyOn(loadAccountsStub, 'load')
    await sut.handle({})
    expect(loadAccountsSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadAccounts throws', async () => {
    const { sut, loadAccountsStub } = makeSut()
    jest
      .spyOn(loadAccountsStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
