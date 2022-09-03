import {
  AddScale,
  badRequest,
  noContent,
  serverError,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-scale-controller-protocols'

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
