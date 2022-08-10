import { LoadAccountById } from '../../../../domain/usecases/account/load-account-by-id'
import { Decrypter } from '../../../protocols/criptography/decrypter'

export class DbLoadAccountById implements LoadAccountById {
  constructor(private readonly decrypter: Decrypter) {}
  async loadById({
    accessToken
  }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
