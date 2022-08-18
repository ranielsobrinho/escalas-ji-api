import { LoadRoles } from '../../../../domain/usecases/roles/load-roles'
import { serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadRolesController implements Controller {
  constructor(private readonly loadRoles: LoadRoles) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadRoles.load()
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
