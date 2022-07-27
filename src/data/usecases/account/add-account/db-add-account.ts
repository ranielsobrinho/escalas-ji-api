import { AccountModel } from '../../../../domain/models/account'
import {
  AddAccount,
  AddAccountModel
} from '../../../../domain/usecases/account/add-account'
import { Encrypter } from '../../../protocols/encrypter'

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
