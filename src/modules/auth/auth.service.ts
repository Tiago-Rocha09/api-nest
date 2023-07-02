import { Injectable } from '@nestjs/common';
import { SignUpBody } from './dtos/signup.body';
import { SignInBody } from './dtos/signin.body';
import { AuthRepository } from './repositories/auth-repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  signUp(body: SignUpBody) {
    return this.authRepository.signUp(body);
  }

  signIn(body: SignInBody) {
    return this.authRepository.signIn(body);
  }
}
