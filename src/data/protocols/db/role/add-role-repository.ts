import { RoleModel } from '../../../../domain/models/role'

export interface AddRoleRepository {
  add(name: string, userId: string): Promise<RoleModel>
}
