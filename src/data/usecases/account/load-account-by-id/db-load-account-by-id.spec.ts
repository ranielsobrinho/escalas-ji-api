import { Decrypter } from '../../../protocols/criptography/decrypter'
import { DbLoadAccountById } from './db-load-account-by-id'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

type SutTypes = {
  sut: DbLoadAccountById
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountById(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountById', () => {
  test('Should call decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadById({
      accessToken: 'any_value'
    })
    expect(decryptSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should return null if decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.loadById({
      accessToken: 'any_value'
    })
    expect(response).toBeNull()
  })

  test('Should throw if decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadById({
      accessToken: 'any_value'
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return an accessToken on success', async () => {
    const { sut } = makeSut()
    const response = await sut.loadById({
      accessToken: 'any_value'
    })
    expect(response).toEqual({ token: 'any_value' })
  })
})
