import { LoadAccountByToken } from '../../../../domain/usecases/account/load-account-by-token'
import { TokenVerify } from '../../../protocols/criptography/token-verify'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: TokenVerify) {}
  async load({ accessToken }: LoadAccountByToken.Params): Promise<void> {
    const token = await this.decrypter.verify(accessToken)
    if (token) {
      return null
    }
    return null
  }
}
