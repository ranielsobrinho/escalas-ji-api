import { AddScale } from '../../../../domain/usecases/scale/add-scale'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddScaleController implements Controller {
  constructor(private readonly addScale: AddScale) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}
