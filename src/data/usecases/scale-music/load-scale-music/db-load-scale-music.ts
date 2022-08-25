import { ScaleMusic } from '../../../../domain/models/scale_music'
import { LoadScaleMusics } from '../../../../domain/usecases/scale-music/load-scale-music'
import { LoadScaleMusicRepository } from '../../../protocols/db/scale-music/load-scale-music'

export class DbLoadScaleMusic implements LoadScaleMusics {
  constructor(
    private readonly loadScaleMusicRepository: LoadScaleMusicRepository
  ) {}

  async load(): Promise<ScaleMusic[]> {
    await this.loadScaleMusicRepository.load()
    return Promise.resolve(null)
  }
}
