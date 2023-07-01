import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';
import { AuthRepository } from './repositories/auth-repository';
import { SignUpBody } from './dtos/signup.body';
import { TransformSignUpDataPipe } from './pipes/signup.pipe';
import { DuplicatedFieldExceptionFilter } from 'src/shared/exceptions/filters/duplicated-field-exception.filter';
import { SignInBody } from './dtos/signin.body';

@Controller('auth')
export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  @Post('signup')
  @UsePipes(TransformSignUpDataPipe)
  @UseFilters(DuplicatedFieldExceptionFilter)
  async signUp(@Body() body: SignUpBody) {
    return await this.authRepository.signUp(body);
  }

  @Post('')
  async signIn(@Body() body: SignInBody) {
    return await this.authRepository.signIn(body);
  }
}
