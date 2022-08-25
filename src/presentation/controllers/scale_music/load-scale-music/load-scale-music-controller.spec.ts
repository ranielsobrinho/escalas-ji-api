import { ScaleMusic } from '../../../../domain/models/scale_music'
import { LoadScaleMusics } from '../../../../domain/usecases/scale-music/load-scale-music'
import { LoadScaleMusicController } from './load-scale-music-controller'

const makeScaleMusic = (): ScaleMusic[] => {
  return [
    {
      id: 'any_id',
      music_link: 'any_link'
    },
    {
      id: 'other_id',
      music_link: 'other_link'
    }
  ]
}

describe('LoadScaleMusicController', () => {
  test('Should call LoadScaleMusic once', async () => {
    class LoadScaleMusicStub implements LoadScaleMusics {
      async load(): Promise<ScaleMusic[]> {
        return Promise.resolve(makeScaleMusic())
      }
    }
    const loadScaleMusicStub = new LoadScaleMusicStub()
    const sut = new LoadScaleMusicController(loadScaleMusicStub)
    const loadSpy = jest.spyOn(loadScaleMusicStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
