import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.generate(account.password)
    const makeFakeAccountData = (): AccountModel => ({
      id: 'id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    return makeFakeAccountData()
  }
}
