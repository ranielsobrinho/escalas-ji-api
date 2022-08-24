import { PrismaClient } from '.prisma/client'
import { DbLoadAccounts } from '../../../../../data/usecases/account/load-accounts/db-load-accounts'
import { LoadAccounts } from '../../../../../domain/usecases/account/load-accounts'
import { AccountPgRepository } from '../../../../../infra/db/postgres/account/account-pg-repository'

export const makeDbLoadAccounts = (): LoadAccounts => {
  const prismaClient = new PrismaClient()
  const accountRepository = new AccountPgRepository(prismaClient)
  return new DbLoadAccounts(accountRepository)
}
