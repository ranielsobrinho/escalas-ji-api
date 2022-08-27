import { AddScaleParams } from '../../../../domain/usecases/scale/add-scale'
import { AddScaleRepository } from '../../../protocols/db/scale/add-scale-repository'
import { DbAddScale } from './db-add-scale'
import MockDate from 'mockdate'

const makeFakeAddScale = (): AddScaleParams => ({
  singers: [
    {
      userId: 'any_singer_id'
    },
    {
      userId: 'other_singer_id'
    }
  ],
  bass: 'any_id',
  guitar: 'any_id',
  acousticGuitar: 'any_id',
  keyboard: 'any_id',
  drum: 'any_id',
  musics: [
    {
      musicId: 'any_music_id'
    },
    {
      musicId: 'other_music_id'
    }
  ],
  date: new Date()
})

const makeFakeAddScaleRepositoryStub = (): AddScaleRepository => {
  class AddScaleRepositoryStub implements AddScaleRepository {
    async add(params: AddScaleParams): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new AddScaleRepositoryStub()
}

type SutTypes = {
  sut: DbAddScale
  addScaleRepositoryStub: AddScaleRepository
}

const makeSut = (): SutTypes => {
  const addScaleRepositoryStub = makeFakeAddScaleRepositoryStub()
  const sut = new DbAddScale(addScaleRepositoryStub)
  return {
    sut,
    addScaleRepositoryStub
  }
}

describe('DbAddScale', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddScaleRepository with correct values', async () => {
    const { sut, addScaleRepositoryStub } = makeSut()
    const addScaleSpy = jest.spyOn(addScaleRepositoryStub, 'add')
    await sut.add(makeFakeAddScale())
    expect(addScaleSpy).toHaveBeenCalledWith(makeFakeAddScale())
  })
})
