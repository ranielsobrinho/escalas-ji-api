import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'

const prisma = new PrismaClient()
describe('ScaleMusic Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
    MockDate.set(new Date())
  })

  beforeEach(async () => {
    MockDate.reset()
    await prisma.scale.deleteMany({ where: { bass: 1 } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /scale', () => {
    test('Should return 403 on add scale without token', async () => {
      await request(app)
        .post('/api/scale')
        .send({
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
          date: new Date()
        })
        .expect(403)
    })
  })
})
