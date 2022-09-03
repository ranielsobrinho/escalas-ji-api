import { AddScaleController } from './add-scale-controller'
import MockDate from 'mockdate'
import { MissingParamError } from '../../../errors'
import {
  AddScale,
  AddScaleParams,
  badRequest,
  noContent,
  serverError,
  HttpRequest,
  Validation
} from './add-scale-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    singers: [
      {
        userId: '1'
      },
      {
        userId: '2'
      }
    ],
    bass: '1',
    guitar: '1',
    acousticGuitar: '1',
    keyboard: '2',
    drum: '3',
    musics: [
      {
        musicId: '1'
      }
    ],
    date: new Date()
  }
})

const makeAddScaleStub = (): AddScale => {
  class AddScaleStub implements AddScale {
    async add(params: AddScaleParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddScaleStub()
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
  sut: AddScaleController
  addScaleStub: AddScale
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addScaleStub = makeAddScaleStub()
  const validationStub = makeValidation()
  const sut = new AddScaleController(addScaleStub, validationStub)
  return {
    sut,
    addScaleStub,
    validationStub
  }
}

describe('AddScaleController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddScale with correct values', async () => {
    const { sut, addScaleStub } = makeSut()
    const addScaleSpy = jest.spyOn(addScaleStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addScaleSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddScale throws', async () => {
    const { sut, addScaleStub } = makeSut()
    jest
      .spyOn(addScaleStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if AddScale succeeds', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
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
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
