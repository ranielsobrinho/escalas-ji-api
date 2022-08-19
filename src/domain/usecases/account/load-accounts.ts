import { AccountModel } from '../../models/account'

export interface LoadAccounts {
  load(): Promise<AccountModel[]>
}
