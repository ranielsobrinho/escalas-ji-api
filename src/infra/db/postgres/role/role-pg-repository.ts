import { PrismaClient } from '.prisma/client'
import { AddRoleRepository } from '../../../../data/protocols/db/role/add-role-repository'
import { LoadRolesRepository } from '../../../../data/protocols/db/role/load-roles-repository'
import { RoleModel } from '../../../../domain/models/role'
import { map } from './role-mapper'

export class RolePgRepository
  implements AddRoleRepository, LoadRolesRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async add(name: string, userId: string): Promise<RoleModel> {
    const integerId = Number(userId)
    const role = await this.prisma.role.create({
      data: {
        name: name,
        userid: integerId
      }
    })
    return map(role)
  }

  async load(): Promise<RoleModel[]> {
    const roles = await this.prisma.role.findMany()
    const mappedRoles = roles.map((role) => map(role))
    return mappedRoles
  }
}
