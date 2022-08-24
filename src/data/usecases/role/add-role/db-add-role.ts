import { AddRole } from '../../../../domain/usecases/roles/add-roles'
import { AddRoleRepository } from '../../../protocols/db/role/add-role-repository'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'

export class DbAddRole implements AddRole {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addRoleRepository: AddRoleRepository
  ) {}

  async add({ name, userId }: AddRole.Params): Promise<AddRole.Result> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    if (!account) {
      return null
    }
    const roleExists = account.role?.find((el) => el.name === name)
    if (!roleExists) {
      const role = await this.addRoleRepository.add(name, userId)
      return { role }
    }
    return null
  }
}
