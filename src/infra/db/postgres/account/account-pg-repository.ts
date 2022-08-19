import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { map } from './account-mapper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'

import { PrismaClient } from '@prisma/client'
import { LoadAccountByIdRepository } from '../../../../data/protocols/db/account/load-account-by-id-repository'

export class AccountPgRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    LoadAccountByIdRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const create = await this.prisma.users.create({
      data: {
        name: account.name,
        email: account.email,
        password: account.password,
        isadmin: account.isAdmin
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

  async loadById(id: string): Promise<AccountModel> {
    const intId = Number(id)
    const result = await this.prisma.users.findUnique({ where: { id: intId } })
    if (result) {
      return map(result)
    }
  }
}
