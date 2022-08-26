import { LoadScaleMusicController } from '../../../../../presentation/controllers/scale_music/load-scale-music/load-scale-music-controller'
import { makeDbLoadScaleMusic } from '../../../usecases/scale_music/load-scale-music/load-scale-music-factory'

export const makeLoadScaleMusicController = (): LoadScaleMusicController => {
  return new LoadScaleMusicController(makeDbLoadScaleMusic())
}
