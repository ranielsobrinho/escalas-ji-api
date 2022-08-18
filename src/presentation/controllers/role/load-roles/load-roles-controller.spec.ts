import { LoadRoles } from '../../../../domain/usecases/roles/load-roles'
import { RoleModel } from '../add-role/add-role-controller-protocols'
import { LoadRolesController } from './load-roles-controller'

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

describe('LoadRolesController', () => {
  test('Should call LoadRoles', async () => {
    class LoadRolesStub implements LoadRoles {
      async load(): Promise<RoleModel[]> {
        return Promise.resolve(makeRoleModel())
      }
    }
    const loadRolesStub = new LoadRolesStub()
    const loadRolesSpy = jest.spyOn(loadRolesStub, 'load')
    const sut = new LoadRolesController(loadRolesStub)
    await sut.handle({})
    expect(loadRolesSpy).toHaveBeenCalled()
  })
})
