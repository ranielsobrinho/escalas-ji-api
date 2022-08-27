import {
  AddScale,
  AddScaleParams
} from '../../../../domain/usecases/scale/add-scale'
import { AddScaleRepository } from '../../../protocols/db/scale/add-scale-repository'

export class DbAddScale implements AddScale {
  constructor(private readonly addScaleRepository: AddScaleRepository) {}

  async add(params: AddScaleParams): Promise<void> {
    await this.addScaleRepository.add(params)
    return Promise.resolve(null)
  }
}
