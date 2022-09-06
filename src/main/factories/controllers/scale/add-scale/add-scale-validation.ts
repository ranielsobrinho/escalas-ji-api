import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddScaleValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'singers',
    'bass',
    'guitar',
    'acousticGuitar',
    'keyboard',
    'drum',
    'musics',
    'date'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
