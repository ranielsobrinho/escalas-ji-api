import { AddScaleController } from '../../../../../presentation/controllers/scale/add-scale/add-scale-controller'
import { makeDbAddScale } from '../../../usecases/scale/add-scale/db-add-scale-factory'
import { makeAddScaleValidation } from './add-scale-validation'

export const makeAddScaleController = (): AddScaleController => {
  return new AddScaleController(makeDbAddScale(), makeAddScaleValidation())
}
