import { AddScaleParams } from '../../../../domain/usecases/scale/add-scale'

export interface AddScaleRepository {
  add(params: AddScaleParams): Promise<void>
}
