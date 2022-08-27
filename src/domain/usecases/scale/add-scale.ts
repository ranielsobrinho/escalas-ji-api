import { Scale } from '../../models/scale'

export type AddScaleParams = Omit<Scale, 'id'>

export interface AddScale {
  add(params: AddScaleParams): Promise<void>
}
