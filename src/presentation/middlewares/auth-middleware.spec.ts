import { LoadAccountById } from '../../domain/usecases/account/load-account-by-id'
import { AccessDenied } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'

const makeLoadById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async loadById({
      accessToken
    }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
      return Promise.resolve({ token: 'any_token' })
    }
  }
  return new LoadAccountByIdStub()
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByIdStub: LoadAccountById
}

const makeSut = (): SutTypes => {
  const loadAccountByIdStub = makeLoadById()
  const sut = new AuthMiddleware(loadAccountByIdStub)
  return {
    sut,
    loadAccountByIdStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })

  test('Should call LoadByToken with correct accessToken', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'loadById')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
