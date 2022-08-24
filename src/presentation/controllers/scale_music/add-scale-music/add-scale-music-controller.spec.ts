import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { noContent, serverError } from '../../../helpers/http-helper'
import { HttpRequest } from '../../../protocols'
import { AddScaleMusicController } from './add-scale-music-controller'
import { Validation } from '../../../helpers/validators/validation'

const makeFakeAddScale = (): AddScaleMusic => {
  class AddScaleMusicStub implements AddScaleMusic {
    async add(params: AddScaleMusic.Params): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new AddScaleMusicStub()
}

const httpRequest: HttpRequest = {
  body: {
    music_link: 'any_link'
  }
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
  sut: AddScaleMusicController
  addScaleMusicStub: AddScaleMusic
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addScaleMusicStub = makeFakeAddScale()
  const validationStub = makeValidation()
  const sut = new AddScaleMusicController(addScaleMusicStub, validationStub)
  return {
    sut,
    addScaleMusicStub,
    validationStub
  }
}

describe('AddScaleMusicController', () => {
  test('Should call AddScaleMusic with correct values', async () => {
    const { sut, addScaleMusicStub } = makeSut()
    const addScaleSpy = jest.spyOn(addScaleMusicStub, 'add')
    await sut.handle(httpRequest)
    expect(addScaleSpy).toHaveBeenCalledWith('any_link')
  })

  test('Should return 500 if AddScaleMusic throws', async () => {
    const { sut, addScaleMusicStub } = makeSut()
    jest
      .spyOn(addScaleMusicStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 if AddScaleMusic succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(noContent())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
