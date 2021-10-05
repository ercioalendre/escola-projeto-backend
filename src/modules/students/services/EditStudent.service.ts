import AppError from "@shared/errors/AppError";
import CheckFields from "@shared/http/providers/CheckFields.provider";
import { Students } from ".prisma/client";
import { IStudent } from "../models/interfaces/Students.interface";
import StudentsRepository from "../models/repositories/Students.repository";

export default class EditStudentService {
  static async execute({ id, name, email, phone }: IStudent): Promise<Students | null> {
    const data = await StudentsRepository.findById(id);

    if (!data) {
      throw new AppError("Estudante não encontrado.", 401);
    }

    data.updatedAt = new Date();

    if (name && CheckFields.inputName(name)) {
      data.name = name.toUpperCase();
    }

    if (email && CheckFields.inputEmail(email)) {
      const emailExists = await StudentsRepository.findByEmail(email);

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

    return await StudentsRepository.update(id, data);
  }
}
