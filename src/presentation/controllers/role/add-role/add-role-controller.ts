import { serverError, ok, badRequest } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation, AddRole } from './add-role-controller-protocols'

export class AddRoleController implements Controller {
  constructor(
    private readonly addRole: AddRole,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, userId } = httpRequest.body
      const role = await this.addRole.add({ name, userId })
      return ok(role)
    } catch (error) {
      return serverError(error)
    }
  }
}
