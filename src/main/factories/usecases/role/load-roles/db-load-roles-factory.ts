import { PrismaClient } from '@prisma/client'
import { DbLoadRoles } from '../../../../../data/usecases/role/load-roles/db-load-roles'
import { LoadRoles } from '../../../../../domain/usecases/roles/load-roles'
import { RolePgRepository } from '../../../../../infra/db/postgres/role/role-pg-repository'

export const makeDbLoadRoles = (): LoadRoles => {
  const prismaClient = new PrismaClient()
  const roleRepository = new RolePgRepository(prismaClient)
  return new DbLoadRoles(roleRepository)
}
