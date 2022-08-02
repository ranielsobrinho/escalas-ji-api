import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { map } from './account-mapper'

import { PrismaClient } from '@prisma/client'

export class AccountPgRepository implements AddAccountRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const create = await this.prisma.users.create({
      data: {
        name: account.name,
        email: account.email,
        password: account.password
      }
    })
    return map(create)
  }
}
