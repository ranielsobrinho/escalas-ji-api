import { RoleModel } from '../../models/role'

export interface LoadRoles {
  load(): Promise<RoleModel[]>
}
