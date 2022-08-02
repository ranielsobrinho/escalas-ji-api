import { AccountModel } from '../../../../domain/models/account'

export const map = (account: any): AccountModel => {
  const { id, ...accountWithIdString } = account
  const accountAdapter = Object.assign({}, accountWithIdString, {
    id: id.toString()
  })
  return accountAdapter
}
