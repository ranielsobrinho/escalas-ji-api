import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeDbAuthentication(), makeLoginValidation())
}
