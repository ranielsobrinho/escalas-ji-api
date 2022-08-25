import { ScaleMusic } from '../../../../domain/models/scale_music'
import { LoadScaleMusics } from '../../../../domain/usecases/scale-music/load-scale-music'
import { LoadScaleMusicRepository } from '../../../protocols/db/scale-music/load-scale-music'

export class DbLoadScaleMusic implements LoadScaleMusics {
  constructor(
    private readonly loadScaleMusicRepository: LoadScaleMusicRepository
  ) {}

  async load(): Promise<ScaleMusic[]> {
    const scaleMusics = await this.loadScaleMusicRepository.load()
    return scaleMusics
  }
}
