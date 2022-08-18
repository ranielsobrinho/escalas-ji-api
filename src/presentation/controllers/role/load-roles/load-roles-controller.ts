import { LoadRoles } from '../../../../domain/usecases/roles/load-roles'
import { serverError, ok } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadRolesController implements Controller {
  constructor(private readonly loadRoles: LoadRoles) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const roles = await this.loadRoles.load()
      return ok(roles)
    } catch (error) {
      return serverError(error)
    }
  }
}
