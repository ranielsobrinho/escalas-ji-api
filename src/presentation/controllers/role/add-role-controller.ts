import { AddRole } from '../../../domain/usecases/roles/add-roles'
import { serverError, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Validation } from '../login/login/login-controller-protocols'

export class AddRoleController implements Controller {
  constructor(
    private readonly addRole: AddRole,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const { name, userId } = httpRequest.body
      const role = await this.addRole.add({ name, userId })
      return ok(role)
    } catch (error) {
      return serverError(error)
    }
  }
}
