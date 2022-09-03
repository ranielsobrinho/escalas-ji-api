import { PrismaClient } from '.prisma/client'
import { AddScaleRepository } from '../../../../data/protocols/db/scale/add-scale-repository'
import { AddScaleParams } from '../../../../domain/usecases/scale/add-scale'

export class ScalePgRepository implements AddScaleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(params: AddScaleParams): Promise<void> {
    const singers = params.singers.map((singer) => +singer.userId)
    const musics = params.musics.map((music) => +music.musicId)
    await this.prisma.scale.create({
      data: {
        singers: singers,
        bass: Number(params.bass),
        guitar: Number(params.guitar),
        acoustic_guitar: Number(params.acousticGuitar),
        drum: Number(params.drum),
        keyboard: Number(params.keyboard),
        musics: musics,
        date: params.date
      }
    })
  }
}
