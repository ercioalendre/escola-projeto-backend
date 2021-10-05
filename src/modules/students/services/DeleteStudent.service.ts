import { Students } from ".prisma/client";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import AppError from "@shared/errors/AppError";
import StudentsRepository from "../models/repositories/Students.repository";

export default class DeleteStudentService {
  static async execute(studentId: string): Promise<Students | null> {
    const student = await StudentsRepository.findById(studentId);

    if (!student) {
      throw new AppError("O estudante que você está tentando excluir não foi encontrado.", 404);
    }

    return await UsersRepository.deleteById(studentId);
  }
}
