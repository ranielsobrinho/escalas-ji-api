import { Authentication } from '../../../../domain/usecases/account/authentication'
import { unauthorized } from '../../../helpers/http-helper'
import { HttpRequest } from '../signup/signup-controller-protocols'
import { LoginController } from './login-controller'
const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(
      authenticationParams: Authentication.Params
    ): Promise<Authentication.Result> {
      return Promise.resolve({ accessToken: 'any_token' })
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
