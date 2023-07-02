import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getUser(@Request() req) {
    console.log({ user: req.user });

    return this.userService.getUser(req.user);
  }
}
