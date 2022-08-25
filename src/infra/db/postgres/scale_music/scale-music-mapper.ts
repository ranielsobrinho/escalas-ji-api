import { ScaleMusic } from '../../../../domain/models/scale_music'

export const map = (music: any): ScaleMusic => {
  const { id, ...musicWithIdString } = music
  const musicAdapter = Object.assign({}, musicWithIdString, {
    id: id.toString()
  })
  return musicAdapter
}

export const mapMusics = (musics: any[]): any[] => {
  return musics.map((music) => map(music))
}
