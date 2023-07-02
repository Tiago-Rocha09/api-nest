import * as bcrypt from 'bcrypt';
import { PasswordService } from '../password.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordServiceBcrypt implements PasswordService {
  async hashPassword(password: string): Promise<string> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    } catch (error) {
      throw 'Erro ao criptografar a senha';
    }
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw 'Erro ao verificar a senha';
    }
  }
}
