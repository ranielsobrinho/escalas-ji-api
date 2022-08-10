import { LoadAccountByToken } from '../../../../domain/usecases/account/load-account-by-token'
import { TokenVerify } from '../../../protocols/criptography/token-verify'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: TokenVerify) {}
  async load({
    accessToken
  }: LoadAccountByToken.Params): Promise<LoadAccountByToken.Result> {
    const token = await this.decrypter.verify(accessToken)
    if (token) {
      return { token: token }
    }
    return null
  }
}
