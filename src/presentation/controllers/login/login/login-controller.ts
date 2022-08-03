import { Authentication } from '../../../../domain/usecases/account/authentication'
import { serverError, unauthorized } from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../signup/signup-controller-protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return null
    } catch (error) {
      return serverError()
    }
  }
}
