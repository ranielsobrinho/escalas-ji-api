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

const makeLoadScaleMusicRepository = (): LoadScaleMusicRepository => {
  class LoadScaleMusicRepositoryStub implements LoadScaleMusicRepository {
    async load(): Promise<ScaleMusic[]> {
      return Promise.resolve(makeScaleMusic())
    }
  }
  return new LoadScaleMusicRepositoryStub()
}

type SutTypes = {
  sut: DbLoadScaleMusic
  loadScaleMusicRepositoryStub: LoadScaleMusicRepository
}

const makeSut = (): SutTypes => {
  const loadScaleMusicRepositoryStub = makeLoadScaleMusicRepository()
  const sut = new DbLoadScaleMusic(loadScaleMusicRepositoryStub)
  return {
    sut,
    loadScaleMusicRepositoryStub
  }
}

describe('DbLoadScaleMusic', () => {
  test('Should call LoadScaleMusicRepository once', async () => {
    const { sut, loadScaleMusicRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadScaleMusicRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if LoadScaleMusicRepository throws', async () => {
    const { sut, loadScaleMusicRepositoryStub } = makeSut()
    jest
      .spyOn(loadScaleMusicRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const response = sut.load()
    await expect(response).rejects.toThrow()
  })
})
