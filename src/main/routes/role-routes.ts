import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddRoleController } from '../factories/controllers/role/add-role/add-role'

export default (router: Router): void => {
  router.post('/add-role', adaptRoute(makeAddRoleController()))
}
