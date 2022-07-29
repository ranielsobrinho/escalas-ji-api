import { MissinParamError } from '../../../errors/missing-param-error'
import { badRequest } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissinParamError(field))
      }
    }
    return {
      statusCode: 200,
      body: 'Cool body'
    }
  }
}
