import { PrismaClient } from '@prisma/client'
import { AddScaleParams } from '../../../../domain/usecases/scale/add-scale'
import { ScalePgRepository } from './scale-pg-repository'
import MockDate from 'mockdate'

const makeAddScale = (): AddScaleParams => ({
  singers: [
    {
      userId: '1'
    },
    {
      userId: '2'
    }
  ],
  bass: '1',
  guitar: '1',
  acousticGuitar: '1',
  keyboard: '2',
  drum: '3',
  musics: [
    {
      musicId: '1'
    }
  ],
  date: new Date('2019-05-27')
})

describe('ScaleMusicPgRepository', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient()
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await prisma.scale.deleteMany({ where: { date: makeAddScale().date } })
    MockDate.reset()
  })

  const makeSut = (): ScalePgRepository => {
    return new ScalePgRepository(prisma)
  }

  describe('add()', () => {
    test('Should create a new scale on success', async () => {
      const sut = makeSut()
      await sut.add(makeAddScale())
      const scale = await prisma.scale.findFirst({
        where: { bass: 1 }
      })
      expect(scale).toBeTruthy()
      expect(scale.bass).toBe(1)
    })
  })
})
