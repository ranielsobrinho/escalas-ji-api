import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { HttpRequest } from '../../../protocols'
import { AddScaleMusicController } from './add-scale-music-controller'

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

type SutTypes = {
  sut: AddScaleMusicController
  addScaleMusicStub: AddScaleMusic
}

const makeSut = (): SutTypes => {
  const addScaleMusicStub = makeFakeAddScale()
  const sut = new AddScaleMusicController(addScaleMusicStub)
  return {
    sut,
    addScaleMusicStub
  }
}

describe('AddScaleMusicController', () => {
  test('Should call AddScaleMusic with correct values', async () => {
    const { sut, addScaleMusicStub } = makeSut()
    const addScaleSpy = jest.spyOn(addScaleMusicStub, 'add')
    await sut.handle(httpRequest)
    expect(addScaleSpy).toHaveBeenCalledWith('any_link')
  })
})
