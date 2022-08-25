import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
describe('ScaleMusic Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.scale_music.deleteMany({ where: { music_link: 'any_link' } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /scale-music', () => {
    test('Should return 403 on add scale music without token', async () => {
      await request(app)
        .post('/api/scale-music')
        .send({
          music_link: 'any_link'
        })
        .expect(403)
    })
  })
})
