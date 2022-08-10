import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements Encrypter, Decrypter {
  constructor(private readonly salt: string) {}

  async generate(value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.salt)
    return accessToken
  }

  async decrypt(token: string): Promise<string> {
    const value = jwt.verify(token, this.salt)
    return value as string
  }
}
