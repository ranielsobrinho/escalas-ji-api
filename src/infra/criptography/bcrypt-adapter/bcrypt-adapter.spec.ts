import bcrypt, { compare } from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash')
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call bcrypt with correct value', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.generate('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should throw if bcrypt throws', async () => {
      const sut = makeSut()
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
        return new Promise((_resolve, reject) => reject(new Error()))
      })
      const promise = sut.generate('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a hash on success', async () => {
      const sut = makeSut()
      const hash = await sut.generate('any_value')
      expect(hash).toBe('hash')
    })
  })
  describe('compare', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
  })
})
