import { AddRole } from '../../../domain/usecases/roles/add-roles'
import { serverError, ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddRoleController implements Controller {
  constructor(private readonly addRole: AddRole) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, userId } = httpRequest.body
      const role = await this.addRole.add({ name, userId })
      return ok(role)
    } catch (error) {
      return serverError(error)
    }
  }
}
