import { Authentication } from '../../../../domain/usecases/account/authentication'
import { HashComparer } from '../../../protocols/hash-comparer'
import { LoadAccountByEmailRepository } from '../../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth({
    email,
    password
  }: Authentication.Params): Promise<Authentication.Result> {
    const acccount = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (acccount) {
      await this.hashComparer.compare(password, acccount.password)
    }
    return Promise.resolve(null)
  }
}
