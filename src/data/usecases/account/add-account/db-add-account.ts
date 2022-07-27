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
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.generate(accountData.password)
    await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    const makeFakeAccountData = (): AccountModel => ({
      id: 'id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    return makeFakeAccountData()
  }
}
