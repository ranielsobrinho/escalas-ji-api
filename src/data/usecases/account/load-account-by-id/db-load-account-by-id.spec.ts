import { Decrypter } from '../../../protocols/criptography/decrypter'
import { DbLoadAccountById } from './db-load-account-by-id'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

const makeFakeLoadById = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountById
  decrypterStub: Decrypter
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByIdRepositoryStub = makeFakeLoadById()
  const sut = new DbLoadAccountById(
    decrypterStub,
    loadAccountByIdRepositoryStub
  )
  return {
    sut,
    decrypterStub,
    loadAccountByIdRepositoryStub
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

  test('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.loadById({
      accessToken: 'any_value'
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.loadById({
      accessToken: 'any_value'
    })
    expect(response).toBeNull()
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadById({
      accessToken: 'any_value'
    })
    await expect(promise).rejects.toThrow()
  })
})
