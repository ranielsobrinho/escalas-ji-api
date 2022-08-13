export interface LoadAccountByToken {
  load(loadByTokenParams: LoadAccountByToken.Params): Promise<void>
}

export namespace LoadAccountByToken {
  export type Params = {
    accessToken: string
  }
}
