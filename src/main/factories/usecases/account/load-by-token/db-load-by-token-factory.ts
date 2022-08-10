import { DbLoadAccountById } from '../../../../../data/usecases/account/load-account-by-id/db-load-account-by-id'
import { LoadAccountById } from '../../../../../domain/usecases/account/load-account-by-id'
import { JWTAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountById => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  return new DbLoadAccountById(jwtAdapter)
}
