import { Encrypter } from '../../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async generate(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return Promise.resolve('')
  }
}