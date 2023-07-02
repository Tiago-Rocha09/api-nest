import { IsEmail, IsNotEmpty } from 'class-validator';

export class OrderBody {
  @IsNotEmpty({ message: 'Você precisa escolher um dos planos' })
  planId: number;

  @IsNotEmpty({ message: 'Você precisa informar o seu nome completo' })
  customerName: string;

  @IsEmail(undefined, { message: 'Você precisa enviar um email válido' })
  customerEmail: string;

  @IsNotEmpty({ message: 'Você precisa escolher um dos planos' })
  customerCpf: string;
}
