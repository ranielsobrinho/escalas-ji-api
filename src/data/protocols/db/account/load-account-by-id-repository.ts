export interface LoadAccountByIdRepository {
  loadById(id: string): Promise<boolean | string>
}
