import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  getUser(user: { sub: string }) {
    return this.userRepository.getUser(Number(user.sub));
  }
}
