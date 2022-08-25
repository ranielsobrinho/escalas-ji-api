import { ScaleMusic } from '../../../../domain/models/scale_music'

export interface LoadScaleMusicRepository {
  load(): Promise<ScaleMusic[]>
}
