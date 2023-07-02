export abstract class PasswordService {
  abstract hashPassword(password: string): Promise<string>;
  abstract comparePassword(password: string, hash: string): Promise<boolean>;
}
