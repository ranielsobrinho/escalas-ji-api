import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { HttpRequest } from '../../../protocols'
import { AddScaleMusicController } from './add-scale-music-controller'

describe('AddScaleMusicController', () => {
  test('Should call AddScaleMusic with correct values', async () => {
    class AddScaleMusicStub implements AddScaleMusic {
      async add(params: AddScaleMusic.Params): Promise<void> {
        return Promise.resolve(null)
      }
    }
    const addScaleMusicStub = new AddScaleMusicStub()
    const sut = new AddScaleMusicController(addScaleMusicStub)
    const addScaleSpy = jest.spyOn(addScaleMusicStub, 'add')
    const httpRequest: HttpRequest = {
      body: {
        music_link: 'any_link'
      }
    }
    await sut.handle(httpRequest)
    expect(addScaleSpy).toHaveBeenCalledWith('any_link')
  })
})
