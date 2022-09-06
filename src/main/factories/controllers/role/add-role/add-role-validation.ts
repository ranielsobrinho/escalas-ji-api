import {
  ValidationComposite,
  RequiredFieldValidation
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddRoleValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'userId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
