import { AddRole } from '../../../../domain/usecases/roles/add-roles'
import { AddRoleRepository } from '../../../protocols/db/add-role-repository'
import { LoadAccountByIdRepository } from '../../../protocols/db/load-account-by-id-repository'

export class DbAddRole implements AddRole {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addRoleRepository: AddRoleRepository
  ) {}

  async add({ name, userId }: AddRole.Params): Promise<AddRole.Result> {
    const isValid = await this.loadAccountByIdRepository.loadById(userId)
    if (isValid) {
      await this.addRoleRepository.add(name, userId)
    }
    return null
  }
}
