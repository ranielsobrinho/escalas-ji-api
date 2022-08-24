import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { AddScaleMusicRepository } from '../../../protocols/db/scale-music/add-scale-music-repository'

export class DbAddScaleMusic implements AddScaleMusic {
  constructor(
    private readonly addScaleMusicRepository: AddScaleMusicRepository
  ) {}
  async add(params: AddScaleMusic.Params): Promise<void> {
    await this.addScaleMusicRepository.add(params.music_link)
  }
}
