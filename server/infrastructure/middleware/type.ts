import { Request } from "express";

export interface SafeUser {
  id: number;
  email: string;
  password?: string;
  name?: string;
}

export interface CustomRequest extends Request {
  user?: SafeUser;
}
