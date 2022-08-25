import { ScaleMusic } from '../../../../domain/models/scale_music'
import { LoadScaleMusicRepository } from '../../../protocols/db/scale-music/load-scale-music'
import { DbLoadScaleMusic } from './db-load-scale-music'

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

describe('DbLoadScaleMusic', () => {
  test('Should call LoadScaleMusicRepository once', async () => {
    class LoadScaleMusicRepositoryStub implements LoadScaleMusicRepository {
      async load(): Promise<ScaleMusic[]> {
        return Promise.resolve(makeScaleMusic())
      }
    }
    const loadScaleMusicStub = new LoadScaleMusicRepositoryStub()
    const sut = new DbLoadScaleMusic(loadScaleMusicStub)
    const loadSpy = jest.spyOn(loadScaleMusicStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
