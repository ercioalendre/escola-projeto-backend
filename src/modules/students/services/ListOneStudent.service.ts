import { Students } from ".prisma/client";
import AppError from "@shared/errors/AppError";
import StudentsRepository from "../models/repositories/Students.repository";

export default class ListOneStudentService {
  static async execute(studentId: string): Promise<Students | string> {
    const student = await StudentsRepository.findById(studentId);

    if (!student) {
      throw new AppError("O estudante que você está buscando não foi encontrado.", 404);
    }

    return student;
  }
}
