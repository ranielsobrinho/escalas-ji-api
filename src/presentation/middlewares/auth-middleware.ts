import { LoadAccountById } from '../../domain/usecases/account/load-account-by-id'
import { AccessDenied } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountById: LoadAccountById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const token = await this.loadAccountById.loadById(accessToken)
        if (token) {
          return ok({ token })
        }
      }
      return forbidden(new AccessDenied())
    } catch (error) {
      return serverError(error)
    }
  }
}
