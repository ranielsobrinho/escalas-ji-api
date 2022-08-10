import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'

export class JWTAdapter implements TokenGenerator, Decrypter {
  constructor(private readonly salt: string) {}

  async generate(id: string): Promise<string> {
    const accessToken = jwt.sign({ id: id }, this.salt)
    return accessToken
  }

  async decrypt(token: string): Promise<string> {
    const value = jwt.verify(token, this.salt)
    return value as string
  }
}
