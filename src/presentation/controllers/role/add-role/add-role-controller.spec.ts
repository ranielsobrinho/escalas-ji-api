import { MissingParamError } from '../../../errors'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols'
import { Validation, AddRole, RoleModel } from './add-role-controller-protocols'
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddRoleController
  addRoleStub: AddRole
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addRoleStub = makeAddRoleStub()
  const validationStub = makeValidation()
  const sut = new AddRoleController(addRoleStub, validationStub)
  return {
    sut,
    addRoleStub,
    validationStub
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

  test('Should return 400 if AddRole returns null', async () => {
    const { sut, addRoleStub } = makeSut()
    jest.spyOn(addRoleStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      badRequest(new Error('Usuário já tem essa função'))
    )
  })

  test('Should return 500 if AddRole throws', async () => {
    const { sut, addRoleStub } = makeSut()
    jest.spyOn(addRoleStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
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

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
