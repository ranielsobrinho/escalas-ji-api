import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()
describe('Login Routes', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.users.deleteMany({ where: { email: 'any_email@mail.com' } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /signup', () => {
    test('Should return an account on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: '123456789',
          passwordConfirmation: '123456789'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('12345', 12)
      await prisma.users.create({
        data: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password
        }
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: '12345'
        })
        .expect(200)
    })

    test('Should return 401 on login without existing account', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'raniel.sobrinho@gmail.com',
          password: '12345'
        })
        .expect(401)
    })
  })
})
