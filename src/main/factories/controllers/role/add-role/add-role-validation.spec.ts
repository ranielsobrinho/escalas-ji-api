import { RequiredFieldValidation } from '../../../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../../../presentation/helpers/validators/validation-composite'
import { makeAddRoleValidation } from './add-role-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('AddRoleValidation Factory', () => {
  test('Should call ValidatonComposite with all validations', () => {
    makeAddRoleValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'userId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
