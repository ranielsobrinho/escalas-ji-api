import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const existingAccount = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email
    )
    if (!existingAccount) {
      const hashedPassword = await this.encrypter.generate(accountData.password)
      const account = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword })
      )
      return account
    }
    return null
  }
}
