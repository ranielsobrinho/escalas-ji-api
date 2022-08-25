import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddScaleMusicController } from '../factories/controllers/scale_music/add-scale-music/add-scale-music'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/scale-music', auth, adaptRoute(makeAddScaleMusicController()))
}
