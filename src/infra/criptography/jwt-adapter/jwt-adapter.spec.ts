import jwt from 'jsonwebtoken'
import { JWTAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

describe('JWTAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JWTAdapter('secret')
    const jwtSpy = jest.spyOn(jwt, 'sign')
    await sut.generate('any_id')
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
