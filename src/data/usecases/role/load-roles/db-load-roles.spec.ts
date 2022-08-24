import { RoleModel } from '../../../../domain/models/role'
import { LoadRolesRepository } from '../../../protocols/db/role/load-roles-repository'
import { DbLoadRoles } from './db-load-roles'

const makeRoleModel = (): RoleModel[] => {
  return [
    {
      id: 'any_id',
      name: 'any_name',
      userId: 'any_id'
    },
    {
      id: 'other_id',
      name: 'other_name',
      userId: 'other_id'
    }
  ]
}

const makeLoadRolesRepository = (): LoadRolesRepository => {
  class LoadRolesRepositoryStub implements LoadRolesRepository {
    async load(): Promise<RoleModel[]> {
      return Promise.resolve(makeRoleModel())
    }
  }
  return new LoadRolesRepositoryStub()
}

type SutTypes = {
  sut: DbLoadRoles
  loadRolesRepositoryStub: LoadRolesRepository
}

const makeSut = (): SutTypes => {
  const loadRolesRepositoryStub = makeLoadRolesRepository()
  const sut = new DbLoadRoles(loadRolesRepositoryStub)
  return {
    sut,
    loadRolesRepositoryStub
  }
}

describe('DbLoadRoles', () => {
  test('Should call LoadRolesRepository', async () => {
    const { sut, loadRolesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadRolesRepositoryStub, 'load')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should throw if LoadRolesRepository throws', async () => {
    const { sut, loadRolesRepositoryStub } = makeSut()
    jest
      .spyOn(loadRolesRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const response = sut.load()
    await expect(response).rejects.toThrow()
  })

  test('Should return an array of roles on success', async () => {
    const { sut } = makeSut()
    const response = await sut.load()
    expect(response).toEqual(makeRoleModel())
    expect(response).toBeInstanceOf(Array)
  })
})
