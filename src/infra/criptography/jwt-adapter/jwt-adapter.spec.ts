import jwt from 'jsonwebtoken'
import { JWTAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token')
  },

  async verify(): Promise<string> {
    return Promise.resolve('any_value')
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

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.generate('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const jwtSpy = jest.spyOn(jwt, 'verify')
      await sut.verify('any_token')
      expect(jwtSpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const token = await sut.verify('any_token')
      expect(token).toBe('any_value')
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.verify('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
