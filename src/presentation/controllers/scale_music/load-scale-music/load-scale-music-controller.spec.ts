import { LoadScaleMusicController } from './load-scale-music-controller'
import {
  LoadScaleMusics,
  ScaleMusic,
  serverError,
  ok
} from './load-scale-music-controller-protocols'

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

const makeLoadScaleMusicStub = (): LoadScaleMusics => {
  class LoadScaleMusicStub implements LoadScaleMusics {
    async load(): Promise<ScaleMusic[]> {
      return Promise.resolve(makeScaleMusic())
    }
  }
  return new LoadScaleMusicStub()
}

type SutTypes = {
  sut: LoadScaleMusicController
  loadScaleMusicStub: LoadScaleMusics
}

const makeSut = (): SutTypes => {
  const loadScaleMusicStub = makeLoadScaleMusicStub()
  const sut = new LoadScaleMusicController(loadScaleMusicStub)
  return {
    sut,
    loadScaleMusicStub
  }
}

describe('LoadScaleMusicController', () => {
  test('Should call LoadScaleMusic once', async () => {
    const { sut, loadScaleMusicStub } = makeSut()
    const loadSpy = jest.spyOn(loadScaleMusicStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if LoadScaleMusic throws', async () => {
    const { sut, loadScaleMusicStub } = makeSut()
    jest.spyOn(loadScaleMusicStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on LoadScaleMusic success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeScaleMusic()))
  })
})
