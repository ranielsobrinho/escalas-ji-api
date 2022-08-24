import { PrismaClient } from '.prisma/client'
import { AddScaleMusicRepository } from '../../../../data/protocols/db/scale-music/add-scale-music-repository'

export class ScaleMusicPgRepository implements AddScaleMusicRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async add(music_link: string): Promise<void> {
    await this.prisma.scale_music.create({
      data: {
        music_link
      }
    })
  }
}
