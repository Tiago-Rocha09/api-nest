import { UserWithoutPassword } from '../dtos/get-user.response';

export abstract class UserRepository {
  abstract getUser(userId: number): Promise<UserWithoutPassword>;
}
