import { RoleModel } from '../../../../domain/models/role'
import { AddRoleRepository } from '../../../protocols/db/add-role-repository'
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

const makeFakeAddRole = (): AddRoleRepository => {
  class AddRoleRepositoryStub implements AddRoleRepository {
    async add(name: string, userId: string): Promise<RoleModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        userId: 'any_id'
      })
    }
  }
  return new AddRoleRepositoryStub()
}

type SutTypes = {
  sut: DbAddRole
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  addRoleRepositoryStub: AddRoleRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeFakeLoadById()
  const addRoleRepositoryStub = makeFakeAddRole()
  const sut = new DbAddRole(
    loadAccountByIdRepositoryStub,
    addRoleRepositoryStub
  )
  return {
    sut,
    loadAccountByIdRepositoryStub,
    addRoleRepositoryStub
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

  test('Should call AddRoleRepository with correct values', async () => {
    const { sut, addRoleRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(addRoleRepositoryStub, 'add')
    await sut.add({
      name: 'any_name',
      userId: 'any_id'
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_name', 'any_id')
  })
})
