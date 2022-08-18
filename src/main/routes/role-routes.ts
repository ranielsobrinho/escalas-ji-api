import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddRoleController } from '../factories/controllers/role/add-role/add-role'
import { makeLoadRolesController } from '../factories/controllers/role/load-roles/load-role'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/add-role', auth, adaptRoute(makeAddRoleController()))
  router.get('/load-roles', auth, adaptRoute(makeLoadRolesController()))
}
