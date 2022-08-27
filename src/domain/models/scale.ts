export type Scale = {
  id: string
  singers: singer[]
  bass: string
  guitar: string
  acousticGuitar: string
  keyboard: string
  drum: string
  musics: music[]
  date: Date
}

type singer = {
  userId: string
}

type music = {
  musicId: string
}
