import { LoadAccountByToken } from '../../../../../domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '../../../../../data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JWTAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jwtAdapter)
}
