import { AddAccount } from '../../../../domain/usecases/account/add-account'
import { InvalidParamError, MissinParamError } from '../../../errors'
import { badRequest, serverError } from '../../../helpers/http-helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../../../protocols/'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissinParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.addAccount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: 'Cool body'
      }
    } catch (error) {
      return serverError()
    }
  }
}
