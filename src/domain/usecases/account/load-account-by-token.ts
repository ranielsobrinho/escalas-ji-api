export interface LoadAccountByToken {
  load(
    loadByIdParams: LoadAccountByToken.Params
  ): Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Params = {
    accessToken: string
  }

  export type Result = {
    token: string
  }
}
