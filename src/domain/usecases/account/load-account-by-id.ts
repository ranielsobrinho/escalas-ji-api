export interface LoadAccountById {
  loadById(
    loadByIdParams: LoadAccountById.Params
  ): Promise<LoadAccountById.Result>
}

export namespace LoadAccountById {
  export type Params = {
    accessToken: string
  }

  export type Result = {
    id: string
  }
}
