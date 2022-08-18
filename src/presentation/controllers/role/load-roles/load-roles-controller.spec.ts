import { LoadRoles } from '../../../../domain/usecases/roles/load-roles'
import { ServerError } from '../../../errors'
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

const makeLoadRoles = (): LoadRoles => {
  class LoadRolesStub implements LoadRoles {
    async load(): Promise<RoleModel[]> {
      return Promise.resolve(makeRoleModel())
    }
  }
  return new LoadRolesStub()
}

type SutTypes = {
  sut: LoadRolesController
  loadRolesStub: LoadRoles
}

const makeSut = (): SutTypes => {
  const loadRolesStub = makeLoadRoles()
  const sut = new LoadRolesController(loadRolesStub)
  return {
    sut,
    loadRolesStub
  }
}

describe('LoadRolesController', () => {
  test('Should call LoadRoles', async () => {
    const { sut, loadRolesStub } = makeSut()
    const loadRolesSpy = jest.spyOn(loadRolesStub, 'load')
    await sut.handle({})
    expect(loadRolesSpy).toHaveBeenCalled()
  })

  test('Should call LoadRoles', async () => {
    const { sut, loadRolesStub } = makeSut()
    jest.spyOn(loadRolesStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('Internal server error'))
  })
})
