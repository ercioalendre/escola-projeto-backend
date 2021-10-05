import { Users } from ".prisma/client";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import AppError from "@shared/errors/AppError";

export default class DeleteUserService {
  static async execute(userId: string): Promise<Users | null> {
    const user = await UsersRepository.findById(userId);

    if (!user) {
      throw new AppError("O usuário que você está tentando excluir não foi encontrado.", 404);
    }

    return await UsersRepository.deleteById(userId);
  }
}
