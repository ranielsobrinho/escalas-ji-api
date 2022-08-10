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
})
