import { RequiredFieldValidation } from '../../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../../../presentation/helpers/validators/validation-composite'
import { makeAddScaleMusicValidation } from './add-scale-music-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('AddScaleMusicValidation Factory', () => {
  test('Should call ValidatonComposite with all validations', () => {
    makeAddScaleMusicValidation()
    const validations: Validation[] = []
    for (const field of ['music_link']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
