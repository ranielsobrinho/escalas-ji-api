export interface AddScaleMusic {
  add(params: AddScaleMusic.Params): Promise<void>
}

export namespace AddScaleMusic {
  export type Params = {
    music_link: string
  }
}
