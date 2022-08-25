import { PrismaClient } from '.prisma/client'
import { AddScaleMusicRepository } from '../../../../data/protocols/db/scale-music/add-scale-music-repository'
import { LoadScaleMusicRepository } from '../../../../data/protocols/db/scale-music/load-scale-music'
import { ScaleMusic } from '../../../../domain/models/scale_music'
import { mapMusics } from './scale-music-mapper'

export class ScaleMusicPgRepository
  implements AddScaleMusicRepository, LoadScaleMusicRepository
{
  constructor(private readonly prisma: PrismaClient) {}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async add(music_link: string): Promise<void> {
    await this.prisma.scale_music.create({
      data: {
        music_link: music_link
      }
    })
  }

  async load(): Promise<ScaleMusic[]> {
    const musics = await this.prisma.scale_music.findMany({})
    return mapMusics(musics)
  }
}
