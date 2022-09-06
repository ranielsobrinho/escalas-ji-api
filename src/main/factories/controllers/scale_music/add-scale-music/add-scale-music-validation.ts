import {
  ValidationComposite,
  RequiredFieldValidation
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddScaleMusicValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['music_link']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
