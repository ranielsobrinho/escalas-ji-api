import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddScaleController } from '../factories/controllers/scale/add-scale/add-scale'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/scale', auth, adaptRoute(makeAddScaleController()))
}
