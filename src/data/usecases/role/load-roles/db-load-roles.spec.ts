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

describe('DbLoadRoles', () => {
  test('Should call LoadRolesRepository', async () => {
    class LoadRolesRepositoryStub implements LoadRolesRepository {
      async load(): Promise<RoleModel[]> {
        return Promise.resolve(makeRoleModel())
      }
    }
    const loadRolesRepositoryStub = new LoadRolesRepositoryStub()
    const sut = new DbLoadRoles(loadRolesRepositoryStub)
    const loadAllSpy = jest.spyOn(loadRolesRepositoryStub, 'load')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
