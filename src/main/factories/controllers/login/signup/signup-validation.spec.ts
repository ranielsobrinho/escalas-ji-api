import {
  RequiredFieldValidation,
  CompareFieldValidation,
  ValidationComposite,
  EmailValidation
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation'
import { EmailValidator } from '../../../../../validation/protocols/email-validator'

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('Should call ValidatonComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation')
    )
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
