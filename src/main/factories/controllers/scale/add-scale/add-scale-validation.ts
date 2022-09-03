import { RequiredFieldValidation } from '../../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../../../presentation/helpers/validators/validation-composite'

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
