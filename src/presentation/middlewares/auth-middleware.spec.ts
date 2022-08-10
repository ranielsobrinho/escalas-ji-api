import { AccessDenied } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountById } from './auth-middleware-protocols'

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

  test('Should return 403 if LoadByToken returns null', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    jest
      .spyOn(loadAccountByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })

  test('Should return 200 if LoadByToken returns a token', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(httpResponse).toEqual(
      ok({
        token: {
          token: 'any_token'
        }
      })
    )
  })

  test('Should return 500 if LoadByToken throws', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    jest
      .spyOn(loadAccountByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
