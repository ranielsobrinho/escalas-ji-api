import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadAccountsController } from '../factories/controllers/accounts/load-accounts/load-accounts'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/load-accounts', auth, adaptRoute(makeLoadAccountsController()))
}
