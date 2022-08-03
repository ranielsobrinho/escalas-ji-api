import { RoleModel } from '../../models/role'

export interface AddRole {
  add(addRoleParams: AddRole.Params): Promise<AddRole.Result>
}

export namespace AddRole {
  export type Params = {
    name: string
    userId: string
  }

  export type Result = {
    role: RoleModel
  }
}
