import { AccessDenied } from '../errors'
import { forbidden, noContent, serverError } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken } from './auth-middleware-protocols'

const makeLoadByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load({ accessToken }: LoadAccountByToken.Params): Promise<void> {
      return Promise.resolve()
    }
  }
  return new LoadAccountByTokenStub()
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByIdStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByIdStub = makeLoadByToken()
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
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'load')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return 200 if LoadByToken returns a token', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadByToken throws', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    jest
      .spyOn(loadAccountByIdStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
