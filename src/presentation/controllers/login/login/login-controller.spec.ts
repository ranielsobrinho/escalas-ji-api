import { Authentication } from '../../../../domain/usecases/account/authentication'
import { LoginController } from './login-controller'

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    class AuthenticationStub implements Authentication {
      async auth(
        authenticationParams: Authentication.Params
      ): Promise<Authentication.Result> {
        return Promise.resolve({ accessToken: 'any_token' })
      }
    }
    const authenticationStub = new AuthenticationStub()
    const sut = new LoginController(authenticationStub)
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})
