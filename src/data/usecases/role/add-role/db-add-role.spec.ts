import { LoadAccountByIdRepository } from '../../../protocols/db/load-account-by-id-repository'
import { DbAddRole } from './db-add-role'

const makeFakeLoadById = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

type SutTypes = {
  sut: DbAddRole
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeFakeLoadById()
  const sut = new DbAddRole(loadAccountByIdRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub
  }
}

describe('DbAddRole', () => {
  test('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.add({
      name: 'any_name',
      userId: 'any_id'
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if LoadAccountByIdRepository returns false', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(false))
    const isAccount = await sut.add({
      name: 'any_name',
      userId: 'any_id'
    })
    expect(isAccount).toBeNull()
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add({
      name: 'any_name',
      userId: 'any_id'
    })
    await expect(promise).rejects.toThrow()
  })
})
