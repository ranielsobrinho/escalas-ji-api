import { PrismaClient } from '.prisma/client'
import { DbAddScaleMusic } from '../../../../../data/usecases/scale-music/add-scale-music/db-add-scale-music'
import { AddScaleMusic } from '../../../../../domain/usecases/scale-music/add-scale-music'
import { ScaleMusicPgRepository } from '../../../../../infra/db/postgres/scale_music/scale-music-pg-repository'

export const makeDbAddScaleMusic = (): AddScaleMusic => {
  const prismaClient = new PrismaClient()
  const scaleMusicRepository = new ScaleMusicPgRepository(prismaClient)
  return new DbAddScaleMusic(scaleMusicRepository)
}
