import { AddScaleMusicRepository } from '../../../protocols/db/scale-music/add-scale-music-repository'
import { DbAddScaleMusic } from './db-add-scale-music'

describe('DbAddScaleMusic', () => {
  test('Should call AddScaleMusicRepository with correct values', async () => {
    class AddScaleMusicRepositoryStub implements AddScaleMusicRepository {
      async add(music_link: string): Promise<void> {
        return Promise.resolve(null)
      }
    }
    const addScaleMusicRepositoryStub = new AddScaleMusicRepositoryStub()
    const sut = new DbAddScaleMusic(addScaleMusicRepositoryStub)
    const addScaleMusicSpy = jest.spyOn(addScaleMusicRepositoryStub, 'add')
    await sut.add({ music_link: 'any_link' })
    expect(addScaleMusicSpy).toHaveBeenCalledWith('any_link')
  })
})
