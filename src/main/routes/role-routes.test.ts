import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
describe('Login Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.users.deleteMany({ where: { email: 'valid_email@mail.com' } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /add-role', () => {
    test('Should return 200 add role', async () => {
      const account = await prisma.users.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password',
          isadmin: false
        }
      })
      await request(app)
        .post('/api/add-role')
        .send({
          name: 'any_name',
          userId: account.id.toString()
        })
        .expect(200)
    })
  })
})
