import { Authentication } from '../../../../domain/usecases/account/authentication'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../signup/signup-controller-protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    await this.authentication.auth({ email, password })
    return null
  }
}
