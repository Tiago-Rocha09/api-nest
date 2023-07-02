import { Injectable } from '@nestjs/common';
import { AuthTokenService } from '../auth-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthTokenJwtService implements AuthTokenService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async generateToken(userId: bigint): Promise<string> {
    try {
      const payload = { sub: userId.toString() };
      return await this.jwtService.signAsync(payload, {
        expiresIn: '100d',
        secret: this.config.get('JWT_SECRET'),
      });
    } catch (error) {
      console.log({ errorMessage: error.message });

      throw new Error('Erro ao gerar o token de autenticação');
    }
  }
}
