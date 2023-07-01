import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRepository } from './repositories/user-repository';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UserRepository) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getUser(@Request() req) {
    console.log({ user: req.user });

    return this.userRepository.getUser(Number(req.user.sub));
  }
}
