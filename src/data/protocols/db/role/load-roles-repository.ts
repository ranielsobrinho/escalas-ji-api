import { RoleModel } from '../../../../domain/models/role'

export interface LoadRolesRepository {
  load(): Promise<RoleModel[]>
}
