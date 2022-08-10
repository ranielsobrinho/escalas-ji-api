import jwt from 'jsonwebtoken'
import { JWTAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const makeSut = (): JWTAdapter => {
  return new JWTAdapter('secret')
}

describe('JWTAdapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const jwtSpy = jest.spyOn(jwt, 'sign')
      await sut.generate('any_id')
      expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const token = await sut.generate('any_id')
      expect(token).toBe('any_token')
    })
  })
})
