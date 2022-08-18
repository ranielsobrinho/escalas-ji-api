import { LoadRolesController } from '../../../../../presentation/controllers/role/load-roles/load-roles-controller'
import { makeDbLoadRoles } from '../../../usecases/role/load-roles/db-load-roles-factory'

export const makeLoadRolesController = (): LoadRolesController => {
  return new LoadRolesController(makeDbLoadRoles())
}
