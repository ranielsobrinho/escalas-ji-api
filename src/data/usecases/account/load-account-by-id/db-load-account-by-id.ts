import { LoadAccountById } from '../../../../domain/usecases/account/load-account-by-id'
import { Decrypter } from '../../../protocols/criptography/decrypter'
import { LoadAccountByIdRepository } from '../../../protocols/db/account/load-account-by-id-repository'

export class DbLoadAccountById implements LoadAccountById {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}
  async loadById({
    accessToken
  }: LoadAccountById.Params): Promise<LoadAccountById.Result> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.loadAccountByIdRepository.loadById(token)
    }
    return null
  }
}
