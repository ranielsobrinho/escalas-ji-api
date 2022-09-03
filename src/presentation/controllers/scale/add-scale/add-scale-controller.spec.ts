import {
  AddScale,
  AddScaleParams
} from '../../../../domain/usecases/scale/add-scale'
import { HttpRequest } from '../../../protocols'
import { AddScaleController } from './add-scale-controller'
import MockDate from 'mockdate'

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

describe('AddScaleController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddScale with correct values', async () => {
    class AddScaleStub implements AddScale {
      async add(params: AddScaleParams): Promise<void> {
        return Promise.resolve()
      }
    }
    const addScaleStub = new AddScaleStub()
    const sut = new AddScaleController(addScaleStub)
    const addScaleSpy = jest.spyOn(addScaleStub, 'add')
    await sut.handle(httpRequest)
    expect(addScaleSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
