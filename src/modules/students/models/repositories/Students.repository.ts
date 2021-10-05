import AppError from "@shared/errors/AppError";
import { PrismaClient, Students } from "@prisma/client";
import { IStudent } from "../interfaces/Students.interface";

const prisma = new PrismaClient();
const Student = prisma.students;

export default class StudentsRepository {
  static async findById(id: string | undefined): Promise<Students | null> {
    try {
      return await Student.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findByPhone(phone: string): Promise<Students | null> {
    try {
      return await Student.findUnique({
        where: {
          phone,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findByEmail(email: string): Promise<Students | null> {
    try {
      return await Student.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findAll(): Promise<Students[] | null> {
    try {
      return await Student.findMany();
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async deleteById(id: string): Promise<Students | null> {
    try {
      return await Student.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async create({ name, email, phone }: IStudent): Promise<Students | null> {
    const data = {
      name,
      email,
      phone,
    };

    try {
      const student = await Student.create({
        data,
      });
      return student;
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async update(id: string | undefined, data: IStudent): Promise<Students | null> {
    try {
      const student = await Student.update({
        where: {
          id,
        },
        data,
      });
      return student;
    } catch (error) {
      throw new AppError(error as string);
    }
  }
}
