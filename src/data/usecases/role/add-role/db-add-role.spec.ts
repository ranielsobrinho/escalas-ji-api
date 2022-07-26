import { RoleModel } from '../../../../domain/models/role'
import { AddRoleRepository } from '../../../protocols/db/role/add-role-repository'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'
import { DbAddRole } from './db-add-role'
import { AccountModel } from '../../account/add-account/db-add-account-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  isAdmin: false
})

const makeFakeAccountWithRole = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role: [
    {
      id: 'any_id',
      name: 'any_role',
      userId: 'any_user_id'
    }
  ],
  isAdmin: false
})

const makeFakeLoadById = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeFakeAddRole = (): AddRoleRepository => {
  class AddRoleRepositoryStub implements AddRoleRepository {
    async add(name: string, userId: string): Promise<RoleModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_role',
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
      name: 'any_role',
      userId: 'any_id'
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))
    const isAccount = await sut.add({
      name: 'any_role',
      userId: 'any_id'
    })
    expect(isAccount).toBeNull()
  })

  test('Should return null if LoadAccountByIdRepository returns an account with the same name provided', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(makeFakeAccountWithRole()))
    const isAccount = await sut.add({
      name: 'any_role',
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
      name: 'any_role',
      userId: 'any_id'
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddRoleRepository with correct values', async () => {
    const { sut, addRoleRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(addRoleRepositoryStub, 'add')
    await sut.add({
      name: 'any_role',
      userId: 'any_id'
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_role', 'any_id')
  })

  test('Should throw if AddRoleRepository throws', async () => {
    const { sut, addRoleRepositoryStub } = makeSut()
    jest.spyOn(addRoleRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add({
      name: 'any_role',
      userId: 'any_id'
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return a role on success', async () => {
    const { sut } = makeSut()
    const newRole = await sut.add({
      name: 'any_role',
      userId: 'any_id'
    })
    expect(newRole).toEqual({
      role: {
        id: 'any_id',
        name: 'any_role',
        userId: 'any_id'
      }
    })
  })
})
