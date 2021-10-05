import { Users } from ".prisma/client";
import UsersRepository from "@modules/users/models/repositories/Users.repository";

export default class ListOneUserService {
  static async execute(userId: string): Promise<Users | null> {
    const user = await UsersRepository.findById(userId);

    return user;
  }
}
