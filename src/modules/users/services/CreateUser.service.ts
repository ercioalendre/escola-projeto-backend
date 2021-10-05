import UsersRepository from "@modules/users/models/repositories/Users.repository";
import { IUser } from "@modules/users/models/interfaces/User.interface";
import AppError from "@shared/errors/AppError";
import { Users } from ".prisma/client";

export default class CreateUserService {
  static async execute({ name, phone, email, password }: IUser): Promise<Users | null | undefined> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Este endereço de e-mail já está cadastrado.");
    }

    const phoneExists = await UsersRepository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError("Este número de telefone já está cadastrado.");
    }

    const createNewUser = await UsersRepository.create({
      name: name.toUpperCase(),
      email,
      phone,
      password,
    });

    return createNewUser;
  }
}
