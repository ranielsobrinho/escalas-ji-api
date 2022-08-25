import { AddScaleMusic } from '../../../../domain/usecases/scale-music/add-scale-music'
import { AddScaleMusicRepository } from '../../../protocols/db/scale-music/add-scale-music-repository'

export class DbAddScaleMusic implements AddScaleMusic {
  constructor(
    private readonly addScaleMusicRepository: AddScaleMusicRepository
  ) {}

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async add({ music_link }: AddScaleMusic.Params): Promise<void> {
    await this.addScaleMusicRepository.add(music_link)
  }
}
