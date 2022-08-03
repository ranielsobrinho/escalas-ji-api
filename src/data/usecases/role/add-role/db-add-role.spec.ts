import { LoadAccountByIdRepository } from '../../../protocols/db/load-account-by-id-repository'
import { DbAddRole } from './db-add-role'

describe('DbAddRole', () => {
  test('Should call LoadAccountByIdRepository with correct values', async () => {
    class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
      async loadById(id: string): Promise<boolean> {
        return Promise.resolve(true)
      }
    }
    const loadAccountByIdRepositoryStub = new LoadAccountByIdRepositoryStub()
    const sut = new DbAddRole(loadAccountByIdRepositoryStub)
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.add({
      name: 'any_name',
      userId: 'any_id'
    })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
