import { AccountModel } from '../../models/account'

export interface LoadUsers {
  load(): Promise<AccountModel[]>
}
