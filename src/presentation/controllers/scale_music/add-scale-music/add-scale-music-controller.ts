import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddScaleMusicController implements Controller {
  constructor(private readonly addScaleMusic: AddScaleMusic) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { music_link } = httpRequest.body
    await this.addScaleMusic.add(music_link)
    return Promise.resolve(null)
  }
}
