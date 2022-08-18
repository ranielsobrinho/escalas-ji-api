import request from 'supertest'
import app from '../config/app'
import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

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
    test('Should return 403 on add role without token', async () => {
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
        .expect(403)
    })

    test('Should return 204 on add role with token', async () => {
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
        .post('/api/add-role')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_name',
          userId: account.id.toString()
        })
        .expect(200)
    })
  })

  describe('GET /load-roles', () => {
    test('Should return 403 on load role without token', async () => {
      await request(app).get('/api/load-roles').expect(403)
    })

    test('Should return 200 on load role with token', async () => {
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
        .get('/api/load-roles')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
