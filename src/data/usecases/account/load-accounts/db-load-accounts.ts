import { LoadAccounts } from '../../../../domain/usecases/account/load-accounts'
import { LoadAccountsRepository } from '../../../protocols/db/account/load-accounts-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccounts implements LoadAccounts {
  constructor(
    private readonly loadAccountsRepository: LoadAccountsRepository
  ) {}
  async load(): Promise<AccountModel[]> {
    await this.loadAccountsRepository.load()
    return Promise.resolve(null)
  }
}
