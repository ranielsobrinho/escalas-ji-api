import { AddScale } from '../../../../domain/usecases/scale/add-scale'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../login/login/login-controller-protocols'

export class AddScaleController implements Controller {
  constructor(
    private readonly addScale: AddScale,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const {
        singers,
        bass,
        guitar,
        acousticGuitar,
        keyboard,
        drum,
        musics,
        date
      } = httpRequest.body
      await this.addScale.add({
        singers,
        bass,
        guitar,
        acousticGuitar,
        keyboard,
        drum,
        musics,
        date
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
