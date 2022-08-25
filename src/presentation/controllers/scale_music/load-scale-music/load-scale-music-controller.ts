import { LoadScaleMusics } from '../../../../domain/usecases/scale-music/load-scale-music'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../add-scale-music/add-scale-music-controller-protocols'

export class LoadScaleMusicController implements Controller {
  constructor(private readonly loadScaleMusic: LoadScaleMusics) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadScaleMusic.load()
    return Promise.resolve(null)
  }
}
