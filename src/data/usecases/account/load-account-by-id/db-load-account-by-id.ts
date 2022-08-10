import { LoadAccountById } from '../../../../domain/usecases/account/load-account-by-id'
import { TokenVerify } from '../../../protocols/criptography/token-verify'

export class DbLoadAccountById implements LoadAccountById {
  constructor(private readonly decrypter: TokenVerify) {}
  async loadById({
    accessToken
  }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
    const token = await this.decrypter.verify(accessToken)
    if (token) {
      return { token: token }
    }
    return null
  }
}
