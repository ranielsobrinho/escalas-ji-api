import { ScaleMusic } from '../../models/scale_music'

export interface LoadScaleMusics {
  load(): Promise<ScaleMusic[]>
}
