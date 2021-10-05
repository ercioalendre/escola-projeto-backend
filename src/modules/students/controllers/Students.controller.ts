import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import ListOneStudentService from "../services/ListOneStudent.service";
import ListAllStudentsService from "../services/ListAllStudents.service";
import CreateStudentService from "../services/CreateStudent.service";
import DeleteStudentService from "../services/DeleteStudent.service";
import EditStudentService from "../services/EditStudent.service";

export default class StudentsController {
  static async listOne(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.body;

    const student = await ListOneStudentService.execute(id);

    if (student) {
      return res.status(200).json(student);
    }
  }

  static async listAll(req: Request, res: Response): Promise<Response | undefined> {
    const students = await ListAllStudentsService.execute();

    if (students) {
      return res.status(200).json(students);
    }
  }

  static async createStudent(req: Request, res: Response): Promise<Response | undefined> {
    const { name, phone, email } = req.body;
    const createNewStudent = await CreateStudentService.execute({ name, phone, email });

    if (createNewStudent) {
      return res.status(201).json(createNewStudent);
    } else {
      throw new AppError("Não foi possível cadastrar este estudante.", 500);
    }
  }

  static async deleteStudent(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    const deleteStudent = await DeleteStudentService.execute(id);

    if (deleteStudent) {
      return res.status(200).json({
        status: "success",
        message: "Estudante excluído com sucesso!",
      });
    } else {
      throw new AppError("Não foi possível excluir este estudante.", 500);
    }
  }

  static async editStudent(req: Request, res: Response): Promise<Response | undefined | void> {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    if (name || email || phone || password) {
      const editUser = await EditStudentService.execute({ id, name, email, phone });

      if (editUser) {
        res.status(200).json({
          status: "success",
          message: "Estudante editado com sucesso!",
          editUser,
        });
      } else {
        throw new AppError("Não foi possível editar este estudante.", 500);
      }
    } else {
      throw new AppError("Não foi possível editar este estudante: dados inválidos.", 500);
    }
  }
}
