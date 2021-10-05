import { Students } from ".prisma/client";
import AppError from "@shared/errors/AppError";
import StudentsRepository from "../models/repositories/Students.repository";

export default class ListAllStudentsService {
  static async execute(): Promise<Students[] | boolean> {
    const students = await StudentsRepository.findAll();

    if (!students || students.length === 0) {
      throw new AppError("Nenhum estudante foi encontrado em nossa base de dados.", 404);
    }

    return students;
  }
}
