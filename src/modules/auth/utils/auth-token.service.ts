export abstract class AuthTokenService {
  abstract generateToken(userId: bigint): Promise<string>;
}
