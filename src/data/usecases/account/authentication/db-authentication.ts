import { Authentication } from '../../../../domain/usecases/account/authentication'
import { LoadAccountByEmailRepository } from '../../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth({
    email,
    password
  }: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(email)
    return Promise.resolve(null)
  }
}
