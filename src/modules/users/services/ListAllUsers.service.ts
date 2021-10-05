import { Users } from ".prisma/client";
import UsersRepository from "@modules/users/models/repositories/Users.repository";

export default class ListAllUsersService {
  static async execute(): Promise<Users[] | null> {
    const users = await UsersRepository.findAll();

    return users;
  }
}
