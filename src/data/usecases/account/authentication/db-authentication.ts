import { Authentication } from '../../../../domain/usecases/account/authentication'
import { HashComparer } from '../../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../../protocols/db/load-account-by-email-repository'
import { TokenGenerator } from '../../../protocols/criptography/token-generator'
import { UpdateAccessTokenRepository } from '../../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth({
    email,
    password
  }: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      )
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        )
        return { accessToken: accessToken }
      }
    }
    return Promise.resolve(null)
  }
}
