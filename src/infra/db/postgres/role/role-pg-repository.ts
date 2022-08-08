import { PrismaClient } from '.prisma/client'
import { AddRoleRepository } from '../../../../data/protocols/db/role/add-role-repository'
import { RoleModel } from '../../../../domain/models/role'

export class RolePgRepository implements AddRoleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(name: string, userId: string): Promise<RoleModel> {
    const integerId = Number(userId)
    const role = await this.prisma.role.create({
      data: {
        name: name,
        userid: integerId
      }
    })
    return Object.assign({}, role, {
      id: role.id.toString(),
      name,
      userId: userId.toString()
    })
  }
}
