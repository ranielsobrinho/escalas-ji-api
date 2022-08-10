import { LoadAccountById } from '../../domain/usecases/account/load-account-by-id'
import { AccessDenied } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByIdStub implements LoadAccountById {
      async loadById({
        accessToken
      }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
        return Promise.resolve({ token: 'any_token' })
      }
    }
    const loadAccountByIdStub = new LoadAccountByIdStub()
    const sut = new AuthMiddleware(loadAccountByIdStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })

  test('Should call LoadByToken with correct accessToken', async () => {
    class LoadAccountByIdStub implements LoadAccountById {
      async loadById({
        accessToken
      }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
        return Promise.resolve({ token: 'any_token' })
      }
    }
    const loadAccountByIdStub = new LoadAccountByIdStub()
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'loadById')
    const sut = new AuthMiddleware(loadAccountByIdStub)
    const httpResponse = await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
