import { IsNotEmpty } from 'class-validator';

export class SignInBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
