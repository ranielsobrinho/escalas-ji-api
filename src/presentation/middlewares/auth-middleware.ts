import { AccessDenied } from '../errors'
import { forbidden, noContent, serverError } from '../helpers/http-helper'
import {
  LoadAccountByToken,
  HttpResponse,
  HttpRequest,
  Middleware
} from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        await this.loadAccountByToken.load(accessToken)
        return noContent()
      }
      return forbidden(new AccessDenied())
    } catch (error) {
      return serverError(error)
    }
  }
}
