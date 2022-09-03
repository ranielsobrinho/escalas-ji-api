import { RequiredFieldValidation } from '../../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../../../presentation/helpers/validators/validation-composite'
import { makeAddScaleValidation } from './add-scale-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('AddScaleValidation Factory', () => {
  test('Should call ValidatonComposite with all validations', () => {
    makeAddScaleValidation()
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
