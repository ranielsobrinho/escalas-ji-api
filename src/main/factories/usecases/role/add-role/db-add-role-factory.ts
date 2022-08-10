import { PrismaClient } from '@prisma/client'
import { DbAddRole } from '../../../../../data/usecases/role/add-role/db-add-role'
import { AddRole } from '../../../../../domain/usecases/roles/add-roles'
import { AccountPgRepository } from '../../../../../infra/db/postgres/account/account-pg-repository'
import { RolePgRepository } from '../../../../../infra/db/postgres/role/role-pg-repository'

export const makeDbAddRole = (): AddRole => {
  const prismaClient = new PrismaClient()
  const accountRepository = new AccountPgRepository(prismaClient)
  const roleRepository = new RolePgRepository(prismaClient)
  return new DbAddRole(accountRepository, roleRepository)
}
