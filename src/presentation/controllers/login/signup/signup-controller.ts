import { Authentication } from '../../../../domain/usecases/account/authentication'
import { EmailInUserError } from '../../../errors'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
  Validation
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password,
        isAdmin: false
      })
      if (!account) {
        return forbidden(new EmailInUserError())
      }
      const token = await this.authentication.auth({
        email,
        password
      })
      return ok(token)
    } catch (error) {
      return serverError(error)
    }
  }
}
