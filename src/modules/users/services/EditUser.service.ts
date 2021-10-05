import UsersRepository from "@modules/users/models/repositories/Users.repository";
import { IUser } from "@modules/users/models/interfaces/User.interface";
import AppError from "@shared/errors/AppError";
import CheckFields from "@shared/http/providers/CheckFields.provider";
import { hash } from "bcryptjs";
import { Users } from ".prisma/client";

export default class EditUserService {
  static async execute({ id, name, email, phone, password }: IUser): Promise<Users | null> {
    const data = await UsersRepository.findById(id);

    if (!data) {
      throw new AppError("Usuário não encontrado.", 401);
    }

    data.updatedAt = new Date();

    if (name && CheckFields.inputName(name)) {
      data.name = name.toUpperCase();
    }

    if (email && CheckFields.inputEmail(email)) {
      const emailExists = await UsersRepository.findByEmail(email);

      if (emailExists) {
        if (emailExists.id === id) {
          throw new AppError("Você já está usando o e-mail que está tentando alterar.");
        } else {
          throw new AppError("O e-mail que você está tentando utilizar já está em uso.");
        }
      }

      data.email = email;
    }

    if (phone && CheckFields.inputPhone(phone)) {
      data.phone = phone;
    }

    if (password && CheckFields.inputPassword(password)) {
      const hashedPassword = await hash(password, 8);
      data.password = hashedPassword;
    }

    return await UsersRepository.update(id, data);
  }
}
