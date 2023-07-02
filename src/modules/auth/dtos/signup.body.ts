import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpBody {
  @IsEmail(undefined, { message: 'Você precisa enviar um email válido' })
  email: string;

  @MinLength(5, { message: 'A senha precisa de, no mínimo, 5 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'Você precisa enviar o seu nome completo' })
  name: string;

  @MinLength(10, {
    message:
      'Você precisa enviar um número de telefone válido, incluindo o DDD',
  })
  phone: string;

  @IsNotEmpty({ message: 'Você precisa enviar um número de CPF válido' })
  cpf: string;
}
