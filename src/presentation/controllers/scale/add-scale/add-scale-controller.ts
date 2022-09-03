import { AddScale } from '../../../../domain/usecases/scale/add-scale'
import { serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddScaleController implements Controller {
  constructor(private readonly addScale: AddScale) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
