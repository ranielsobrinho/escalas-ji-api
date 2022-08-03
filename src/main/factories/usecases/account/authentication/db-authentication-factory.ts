import { PrismaClient } from '@prisma/client'
import { DbAuthentication } from '../../../../../data/usecases/account/authentication/db-authentication'
import { Authentication } from '../../../../../domain/usecases/account/authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JWTAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountPgRepository } from '../../../../../infra/db/postgres/account/account-pg-repository'
import env from '../../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  const prismaClient = new PrismaClient()
  const accountRepository = new AccountPgRepository(prismaClient)
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter)
}
