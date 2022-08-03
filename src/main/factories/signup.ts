import { PrismaClient } from '@prisma/client'
import { DbAddAccount } from '../../data/usecases/account/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPgRepository } from '../../infra/db/postgres/account/account-pg-repository'
import { SignUpController } from '../../presentation/controllers/login/signup/signup-controller'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const prismaClient = new PrismaClient()
  const addAccountRepository = new AccountPgRepository(prismaClient)
  const validationComposite = makeSignUpValidation()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  return new SignUpController(addAccount, validationComposite)
}
