import { SignInBody } from '../dtos/signin.body';
import { SignInResponse } from '../dtos/signin.response';
import { SignUpBody } from '../dtos/signup.body';
import { SignUpResponse } from '../dtos/signup.response';

export abstract class AuthRepository {
  abstract signUp(body: SignUpBody): Promise<SignUpResponse>;

  abstract signIn(body: SignInBody): Promise<SignInResponse>;
}
