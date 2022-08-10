import { AddRole } from '../../../domain/usecases/roles/add-roles'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddRoleController implements Controller {
  constructor(private readonly addRole: AddRole) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, userId } = httpRequest.body
    await this.addRole.add({ name, userId })
    return Promise.resolve(null)
  }
}
