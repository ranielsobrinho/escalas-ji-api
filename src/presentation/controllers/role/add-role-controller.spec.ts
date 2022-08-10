import { RoleModel } from '../../../domain/models/role'
import { AddRole } from '../../../domain/usecases/roles/add-roles'
import { ServerError } from '../../errors'
import { ok } from '../../helpers/http-helper'
import { HttpRequest } from '../../protocols'
import { AddRoleController } from './add-role-controller'

const makeFakeRole = (): RoleModel => ({
  id: 'any_id',
  name: 'any_name',
  userId: '1'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    userId: '1'
  }
})

const makeAddRoleStub = (): AddRole => {
  class AddRoleStub implements AddRole {
    async add({ name, userId }: AddRole.Params): Promise<AddRole.Result> {
      return Promise.resolve({ role: makeFakeRole() })
    }
  }
  return new AddRoleStub()
}

type SutTypes = {
  sut: AddRoleController
  addRoleStub: AddRole
}

const makeSut = (): SutTypes => {
  const addRoleStub = makeAddRoleStub()
  const sut = new AddRoleController(addRoleStub)
  return {
    sut,
    addRoleStub
  }
}

describe('AddRoleController', () => {
  test('Should call AddRole with correct values', async () => {
    const { sut, addRoleStub } = makeSut()
    const addRoleSpy = jest.spyOn(addRoleStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addRoleSpy).toHaveBeenCalledWith({
      name: 'any_name',
      userId: '1'
    })
  })

  test('Should return 500 if AddRole throws', async () => {
    const { sut, addRoleStub } = makeSut()
    jest.spyOn(addRoleStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('Internal server error'))
  })

  test('Should return a new role on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      ok({
        role: {
          id: 'any_id',
          name: 'any_name',
          userId: '1'
        }
      })
    )
  })
})
