import {
  LoadScaleMusics,
  Controller,
  HttpRequest,
  HttpResponse,
  serverError,
  ok
} from './load-scale-music-controller-protocols'

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
