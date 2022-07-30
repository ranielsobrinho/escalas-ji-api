import request from 'supertest'
import app from '../config/app'

describe('Login Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Raniel Sobrinho',
        email: 'raniel.sobrinho@gmail.com',
        password: '123456789',
        passwordConfirmation: '123456789'
      })
      .expect(200)
  })
})
