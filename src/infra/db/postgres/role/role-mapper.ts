import { RoleModel } from '../../../../domain/models/role'

export const map = (role: any): RoleModel => {
  const { id, userid, ...roleWithIdString } = role
  const roleAdapter = Object.assign({}, roleWithIdString, {
    id: id.toString(),
    userId: userid.toString()
  })
  return roleAdapter
}
