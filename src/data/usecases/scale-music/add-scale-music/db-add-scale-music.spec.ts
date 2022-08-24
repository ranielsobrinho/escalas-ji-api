import { AddScaleMusicRepository } from '../../../protocols/db/scale-music/add-scale-music-repository'
import { DbAddScaleMusic } from './db-add-scale-music'

const makeFakeAddScaleRepository = (): AddScaleMusicRepository => {
  class AddScaleMusicRepositoryStub implements AddScaleMusicRepository {
    async add(music_link: string): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new AddScaleMusicRepositoryStub()
}

type SutTypes = {
  sut: DbAddScaleMusic
  addScaleMusicRepositoryStub: AddScaleMusicRepository
}

const makeSut = (): SutTypes => {
  const addScaleMusicRepositoryStub = makeFakeAddScaleRepository()
  const sut = new DbAddScaleMusic(addScaleMusicRepositoryStub)
  return {
    sut,
    addScaleMusicRepositoryStub
  }
}

describe('DbAddScaleMusic', () => {
  test('Should call AddScaleMusicRepository with correct values', async () => {
    const { sut, addScaleMusicRepositoryStub } = makeSut()
    const addScaleMusicSpy = jest.spyOn(addScaleMusicRepositoryStub, 'add')
    await sut.add({ music_link: 'any_link' })
    expect(addScaleMusicSpy).toHaveBeenCalledWith('any_link')
  })

  test('Should throw if AddScaleMusicRepository throws', async () => {
    const { sut, addScaleMusicRepositoryStub } = makeSut()
    jest
      .spyOn(addScaleMusicRepositoryStub, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.add({ music_link: 'any_link' })
    await expect(promise).rejects.toThrow()
  })
})
