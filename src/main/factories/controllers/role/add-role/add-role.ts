import { AddRoleController } from '../../../../../presentation/controllers/role/add-role-controller'
import { makeDbAddRole } from '../../../usecases/role/add-role/db-add-role-factory'
import { makeAddRoleValidation } from './add-role-validation'

export const makeAddRoleController = (): AddRoleController => {
  return new AddRoleController(makeDbAddRole(), makeAddRoleValidation())
}
