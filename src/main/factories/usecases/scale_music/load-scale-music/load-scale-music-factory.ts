import { PrismaClient } from '.prisma/client'
import { DbLoadScaleMusic } from '../../../../../data/usecases/scale-music/load-scale-music/db-load-scale-music'
import { ScaleMusicPgRepository } from '../../../../../infra/db/postgres/scale_music/scale-music-pg-repository'

export const makeDbLoadScaleMusic = (): DbLoadScaleMusic => {
  const prismaClient = new PrismaClient()
  const loadScaleMusicRepository = new ScaleMusicPgRepository(prismaClient)
  return new DbLoadScaleMusic(loadScaleMusicRepository)
}
