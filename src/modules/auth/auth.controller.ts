import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';
import { SignUpBody } from './dtos/signup.body';
import { TransformSignUpDataPipe } from './pipes/signup.pipe';
import { DuplicatedFieldExceptionFilter } from 'src/shared/exceptions/filters/duplicated-field-exception.filter';
import { SignInBody } from './dtos/signin.body';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(TransformSignUpDataPipe)
  @UseFilters(DuplicatedFieldExceptionFilter)
  async signUp(@Body() body: SignUpBody) {
    return await this.authService.signUp(body);
  }

  @Post('')
  async signIn(@Body() body: SignInBody) {
    return await this.authService.signIn(body);
  }
}
