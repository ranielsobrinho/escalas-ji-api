import {
  AddScaleMusic,
  badRequest,
  noContent,
  serverError,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-scale-music-controller-protocols'

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
