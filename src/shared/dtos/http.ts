import { Request } from 'express';

export class UserInHttpHeader {
  id: string;
}

export interface RequestWithUser extends Request {
  user: UserInHttpHeader;
}
