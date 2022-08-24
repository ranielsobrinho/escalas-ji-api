import { LoadAccounts } from '../../../../domain/usecases/account/load-accounts'
import { serverError, ok } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadAccountsController implements Controller {
  constructor(private readonly loadAccounts: LoadAccounts) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accounts = await this.loadAccounts.load()
      return ok(accounts)
    } catch (error) {
      return serverError(error)
    }
  }
}
