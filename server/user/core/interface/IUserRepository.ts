import { UserData } from "../entity/User";

export interface IUserRepository {
  getProfileById(id: number): Promise<UserData | null>;
}
