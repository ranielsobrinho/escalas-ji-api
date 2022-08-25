import { AddScaleMusicController } from '../../../../../presentation/controllers/scale_music/add-scale-music/add-scale-music-controller'
import { makeDbAddScaleMusic } from '../../../usecases/scale_music/add-scale-music/db-add-scale-music-factory'
import { makeAddScaleMusicValidation } from './add-scale-music-validation'

export const makeAddScaleMusicController = (): AddScaleMusicController => {
  return new AddScaleMusicController(
    makeDbAddScaleMusic(),
    makeAddScaleMusicValidation()
  )
}
