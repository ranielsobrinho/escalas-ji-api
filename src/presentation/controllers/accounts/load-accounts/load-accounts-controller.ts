import { LoadAccounts } from '../../../../domain/usecases/account/load-accounts'
import { serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadAccountsController implements Controller {
  constructor(private readonly loadAccounts: LoadAccounts) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadAccounts.load()
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
