import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../../helpers/validators/validation'

export class AddScaleMusicController implements Controller {
  constructor(
    private readonly addScaleMusic: AddScaleMusic,
    private readonly validation: Validation
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { music_link } = httpRequest.body
      await this.addScaleMusic.add(music_link)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
