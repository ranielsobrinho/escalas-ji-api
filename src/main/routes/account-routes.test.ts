import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const prisma = new PrismaClient()
describe('Accounts Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.users.deleteMany({ where: { email: 'valid_email@mail.com' } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /load-accounts', () => {
    test('Should return 403 if no accessToken is provided', async () => {
      await request(app).get('/api/load-accounts').expect(403)
    })

    test('Should return 200 if accessToken is provided', async () => {
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
        .get('/api/load-accounts')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
