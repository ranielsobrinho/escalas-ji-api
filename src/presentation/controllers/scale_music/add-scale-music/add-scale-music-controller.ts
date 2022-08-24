import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddScaleMusicController implements Controller {
  constructor(private readonly addScaleMusic: AddScaleMusic) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { music_link } = httpRequest.body
      await this.addScaleMusic.add(music_link)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}