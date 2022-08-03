import { Authentication } from '../../../../domain/usecases/account/authentication'
import { HashComparer } from '../../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../../protocols/db/load-account-by-email-repository'
import { TokenGenerator } from '../../../protocols/criptography/token-generator'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
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
        return { accessToken: accessToken }
      }
    }
    return null
  }
}
