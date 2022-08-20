import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
describe('Accounts Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.users.deleteMany({ where: { email: 'any_email@mail.com' } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /load-accounts', () => {
    test('Should return accounts on success', async () => {
      await request(app).get('/api/load-accounts').expect(200)
    })
  })
})
