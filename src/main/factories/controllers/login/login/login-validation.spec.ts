import { RequiredFieldValidation } from '../../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../../../presentation/helpers/validators/validation-composite'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('Should call ValidatonComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
