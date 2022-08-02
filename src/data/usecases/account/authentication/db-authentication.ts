import { Authentication } from '../../../../domain/usecases/account/authentication'
import { HashComparer } from '../../../protocols/hash-comparer'
import { LoadAccountByEmailRepository } from '../../../protocols/load-account-by-email-repository'
import { TokenGenerator } from '../../../protocols/token-generator'

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
    const acccount = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (acccount) {
      const isValid = await this.hashComparer.compare(
        password,
        acccount.password
      )
      if (isValid) {
        await this.tokenGenerator.generate(acccount.id)
      }
    }
    return Promise.resolve(null)
  }
}
