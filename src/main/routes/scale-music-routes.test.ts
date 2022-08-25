import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const prisma = new PrismaClient()
describe('ScaleMusic Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.scale_music.deleteMany({ where: { music_link: 'any_link' } })
    await prisma.users.deleteMany({ where: { email: 'valid_email@mail.com' } })
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
    test('Should return 204 on add scale music with token', async () => {
      const account = await prisma.users.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password',
          isadmin: false
        }
      })
      const accessToken = sign(account.id.toString(), env.jwtSecret)
      await request(app)
        .post('/api/scale-music')
        .set('x-access-token', accessToken)
        .send({
          music_link: 'any_link'
        })
        .expect(204)
    })
  })
})
