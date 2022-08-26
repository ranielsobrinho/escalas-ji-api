import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddScaleMusicController } from '../factories/controllers/scale_music/add-scale-music/add-scale-music'
import { makeLoadScaleMusicController } from '../factories/controllers/scale_music/load-scale-music/load-scale-music'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/scale-music', auth, adaptRoute(makeAddScaleMusicController()))
  router.get('/scale-music', auth, adaptRoute(makeLoadScaleMusicController()))
}
