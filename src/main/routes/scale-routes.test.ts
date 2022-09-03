import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const prisma = new PrismaClient()
describe('Scale Routes', () => {
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
          date: new Date('2019-05-27')
        })
        .expect(403)
    })

    test('Should return 204 on add scale with token', async () => {
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
        .post('/api/scale')
        .set('x-access-token', accessToken)
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
          date: new Date('2019-05-27')
        })
        .expect(204)
    })
  })
})
