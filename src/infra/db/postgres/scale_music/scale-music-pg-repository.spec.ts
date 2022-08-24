import { PrismaClient } from '@prisma/client'
import { ScaleMusicPgRepository } from './scale-music-pg-repository'

describe('ScaleMusicPgRepository', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
  })

  afterAll(async () => {
    await prisma.scale_music.deleteMany({ where: { music_link: 'any_link' } })
  })

  const makeSut = (): ScaleMusicPgRepository => {
    return new ScaleMusicPgRepository(prisma)
  }

  describe('add()', () => {
    test('Should create a new music link on success', async () => {
      const sut = makeSut()
      await sut.add('any_link')
      const music = await prisma.scale_music.findFirst({
        where: { music_link: 'any_link' }
      })
      expect(music).toBeTruthy()
      expect(music.music_link).toBe('any_link')
    })
  })
})
