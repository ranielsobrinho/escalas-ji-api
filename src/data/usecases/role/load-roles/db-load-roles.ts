import { RoleModel } from '../../../../domain/models/role'
import { LoadRoles } from '../../../../domain/usecases/roles/load-roles'
import { LoadRolesRepository } from '../../../protocols/db/role/load-roles-repository'

export class DbLoadRoles implements LoadRoles {
  constructor(private readonly loadRolesRepository: LoadRolesRepository) {}
  async load(): Promise<RoleModel[]> {
    const roles = await this.loadRolesRepository.load()
    return roles ? roles : null
  }
}
