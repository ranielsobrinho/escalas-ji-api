import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { map } from './account-mapper'

import { PrismaClient } from '@prisma/client'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

export class AccountPgRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
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

  async loadByEmail(email: string): Promise<AccountModel> {
    const account = await this.prisma.users.findFirst({
      where: {
        email
      }
    })
    return account && map(account)
  }
}
