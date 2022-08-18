import { LoadRoles } from '../../../../domain/usecases/roles/load-roles'
import { ServerError } from '../../../errors'
import { ok, serverError } from '../../../helpers/http-helper'
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

  test('Should return 500 if LoadRoles throws', async () => {
    const { sut, loadRolesStub } = makeSut()
    jest.spyOn(loadRolesStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(ok(makeRoleModel()))
  })
})
