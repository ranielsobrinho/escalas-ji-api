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

describe('DbAddScale', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddScaleRepository with correct values', async () => {
    class AddScaleRepositoryStub implements AddScaleRepository {
      async add(params: AddScaleParams): Promise<void> {
        return Promise.resolve(null)
      }
    }
    const addScaleRepositoryStub = new AddScaleRepositoryStub()
    const sut = new DbAddScale(addScaleRepositoryStub)
    const addScaleSpy = jest.spyOn(addScaleRepositoryStub, 'add')
    await sut.add(makeFakeAddScale())
    expect(addScaleSpy).toHaveBeenCalledWith(makeFakeAddScale())
  })
})
