import { LoadScaleMusics } from '../../../../domain/usecases/scale-music/load-scale-music'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  serverError,
  ok
} from '../add-scale-music/add-scale-music-controller-protocols'

export class LoadScaleMusicController implements Controller {
  constructor(private readonly loadScaleMusic: LoadScaleMusics) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const musics = await this.loadScaleMusic.load()
      return ok(musics)
    } catch (error) {
      return serverError(error)
    }
  }
}
