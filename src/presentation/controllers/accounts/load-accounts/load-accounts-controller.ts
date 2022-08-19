import { LoadAccounts } from '../../../../domain/usecases/account/load-accounts'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadAccountsController implements Controller {
  constructor(private readonly loadAccounts: LoadAccounts) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadAccounts.load()
    return Promise.resolve(null)
  }
}
