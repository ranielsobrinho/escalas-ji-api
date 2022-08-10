import { AddRole } from '../../../domain/usecases/roles/add-roles'
import { serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddRoleController implements Controller {
  constructor(private readonly addRole: AddRole) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, userId } = httpRequest.body
      await this.addRole.add({ name, userId })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
