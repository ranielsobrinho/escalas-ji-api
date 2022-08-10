import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const validationComposite = makeSignUpValidation()
  return new SignUpController(
    makeDbAddAccount(),
    validationComposite,
    makeDbAuthentication()
  )
}
