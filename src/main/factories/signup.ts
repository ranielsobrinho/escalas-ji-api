import { DbAddAccount } from '../../data/usecases/account/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account-mongo-repository'
import { SignUpController } from '../../presentation/controllers/login/signup/signup-controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const validationComposite = makeSignUpValidation()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  return new SignUpController(emailValidator, addAccount, validationComposite)
}
