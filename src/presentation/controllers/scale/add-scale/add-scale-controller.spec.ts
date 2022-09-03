import {
  AddScale,
  AddScaleParams
} from '../../../../domain/usecases/scale/add-scale'
import { HttpRequest } from '../../../protocols'
import { AddScaleController } from './add-scale-controller'
import MockDate from 'mockdate'
import { noContent, serverError } from '../../../helpers/http-helper'

const httpRequest: HttpRequest = {
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
}

const makeAddScaleStub = (): AddScale => {
  class AddScaleStub implements AddScale {
    async add(params: AddScaleParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddScaleStub()
}

type SutTypes = {
  sut: AddScaleController
  addScaleStub: AddScale
}

const makeSut = (): SutTypes => {
  const addScaleStub = makeAddScaleStub()
  const sut = new AddScaleController(addScaleStub)
  return {
    sut,
    addScaleStub
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
    await sut.handle(httpRequest)
    expect(addScaleSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddScale throws', async () => {
    const { sut, addScaleStub } = makeSut()
    jest
      .spyOn(addScaleStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if AddScale succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
