import { MissinParamError } from '../../../errors/missing-param-error'
import { badRequest } from '../../../helpers/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email } = httpRequest.body
    if (!name) {
      return badRequest(new MissinParamError('name'))
    }
    if (!email) {
      return badRequest(new MissinParamError('email'))
    }
    return {
      statusCode: 200,
      body: 'Cool body'
    }
  }
}
