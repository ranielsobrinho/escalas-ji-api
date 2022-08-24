import { LoadAccountsController } from '../../../../../presentation/controllers/accounts/load-accounts/load-accounts-controller'
import { makeDbLoadAccounts } from '../../../usecases/account/load-accounts/db-load-accounts'

export const makeLoadAccountsController = (): LoadAccountsController => {
  return new LoadAccountsController(makeDbLoadAccounts())
}
