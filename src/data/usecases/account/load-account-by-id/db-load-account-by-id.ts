import { LoadAccountById } from '../../../../domain/usecases/account/load-account-by-id'
import { Decrypter } from '../../../protocols/criptography/decrypter'

export class DbLoadAccountById implements LoadAccountById {
  constructor(private readonly decrypter: Decrypter) {}
  async loadById({
    accessToken
  }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      return { token: token }
    }
    return null
  }
}
