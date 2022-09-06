import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'
import { makeAddScaleValidation } from './add-scale-validation'

jest.mock('../../../../../validation/validators/validation-composite')

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
