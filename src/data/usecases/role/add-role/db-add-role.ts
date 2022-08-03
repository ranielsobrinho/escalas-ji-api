import { AddRole } from '../../../../domain/usecases/roles/add-roles'
import { LoadAccountByIdRepository } from '../../../protocols/db/load-account-by-id-repository'

export class DbAddRole implements AddRole {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async add({ name, userId }: AddRole.Params): Promise<AddRole.Result> {
    await this.loadAccountByIdRepository.loadById(userId)
    return null
  }
}
