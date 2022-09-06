import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'
import { makeAddScaleMusicValidation } from './add-scale-music-validation'

jest.mock('../../../../../validation/validators/validation-composite')

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
