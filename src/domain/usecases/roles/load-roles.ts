import { RoleModel } from '../../models/role'

export interface LoadRoles {
  loadAll(): Promise<RoleModel[]>
}
