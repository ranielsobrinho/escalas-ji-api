import { AccountModel } from '../../../../domain/models/account'

export const map = (account: any): AccountModel => {
  const { _id, ...accounWithoutId } = account
  const accountAdapter = Object.assign({}, accounWithoutId, { id: _id })
  const accountWithId = {
    name: accountAdapter.name,
    email: accountAdapter.email,
    password: accountAdapter.password,
    isAdmin: accountAdapter.isAdmin,
    id: accountAdapter.id.toString()
  }
  return accountWithId
}
