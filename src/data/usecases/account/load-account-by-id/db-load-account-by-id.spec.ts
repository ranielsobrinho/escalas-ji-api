import { Decrypter } from '../../../protocols/criptography/decrypter'
import { DbLoadAccountById } from './db-load-account-by-id'

describe('DbLoadAccountById', () => {
  test('Should call decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt(value: string): Promise<string> {
        return Promise.resolve('any_value')
      }
    }
    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountById(decrypterStub)
    await sut.loadById({
      accessToken: 'any_value'
    })
    expect(decryptSpy).toHaveBeenCalledWith('any_value')
  })
})
