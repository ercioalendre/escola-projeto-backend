import { Students } from ".prisma/client";
import AppError from "@shared/errors/AppError";
import { IStudent } from "../models/interfaces/Students.interface";
import StudentsRepository from "../models/repositories/Students.repository";

export default class CreateStudentService {
  static async execute({ name, phone, email }: IStudent): Promise<Students | null | undefined> {
    const emailExists = await StudentsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Este endereço de e-mail já está cadastrado.");
    }

    const phoneExists = await StudentsRepository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError("Este número de telefone já está cadastrado.");
    }

    const createNewStudent = await StudentsRepository.create({
      name: name.toUpperCase(),
      email,
      phone,
    });

    return createNewStudent;
  }
}
