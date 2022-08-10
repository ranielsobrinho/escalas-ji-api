import { LoadAccountById } from '../../domain/usecases/account/load-account-by-id'
import { AccessDenied } from '../errors'
import { forbidden, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountById: LoadAccountById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const token = await this.loadAccountById.loadById(accessToken)
      if (token) {
        return ok({ token })
      }
    }
    return forbidden(new AccessDenied())
  }
}
