import { AccessDenied } from '../errors'
import { forbidden } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDenied())
  }
}