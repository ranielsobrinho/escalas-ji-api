import { LoadAccountById } from '../../domain/usecases/account/load-account-by-id'
import { AccessDenied } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountById: LoadAccountById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountById.loadById(accessToken)
    }
    return forbidden(new AccessDenied())
  }
}
