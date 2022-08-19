import { AccountModel } from '../../../../domain/models/account'

export const map = (account: any): AccountModel => {
  const { id, ...accountWithIdString } = account
  const accountAdapter = Object.assign({}, accountWithIdString, {
    id: id.toString()
  })
  return accountAdapter
}

export const mapAccounts = (accounts: any[]): any[] => {
  return accounts.map((account) => map(account))
}
