import { PrismaClient } from '@prisma/client'
import { DbAddAccount } from '../../../../../data/usecases/account/add-account/db-add-account'
import { AddAccount } from '../../../../../domain/usecases/account/add-account'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPgRepository } from '../../../../../infra/db/postgres/account/account-pg-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const prismaClient = new PrismaClient()
  const addAccountRepository = new AccountPgRepository(prismaClient)
  return new DbAddAccount(encrypter, addAccountRepository)
}
