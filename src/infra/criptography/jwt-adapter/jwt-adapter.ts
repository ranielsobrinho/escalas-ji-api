import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements Encrypter {
  constructor(private readonly salt: string) {}

  async generate(value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.salt)
    return accessToken
  }
}
