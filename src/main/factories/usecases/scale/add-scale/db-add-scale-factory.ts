import { PrismaClient } from '.prisma/client'
import { DbAddScale } from '../../../../../data/usecases/scale/add-scale/db-add-scale'
import { AddScale } from '../../../../../domain/usecases/scale/add-scale'
import { ScalePgRepository } from '../../../../../infra/db/postgres/scale/scale-pg-repository'

export const makeDbAddScale = (): AddScale => {
  const prismaClient = new PrismaClient()
  const addScaleRepository = new ScalePgRepository(prismaClient)
  return new DbAddScale(addScaleRepository)
}
