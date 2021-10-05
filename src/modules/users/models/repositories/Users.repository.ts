import { IUser } from "@modules/users/models/interfaces/User.interface";
import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import { PrismaClient, Users } from "@prisma/client";

const prisma = new PrismaClient();
const User = prisma.users;

export default class UsersRepository {
  static async findById(id: string | undefined): Promise<Users | null> {
    try {
      return await User.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findByPhone(phone: string): Promise<Users | null> {
    try {
      return await User.findUnique({
        where: {
          phone,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findByEmail(email: string): Promise<Users | null> {
    try {
      return await User.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findAll(): Promise<Users[] | null> {
    try {
      return await User.findMany();
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async deleteById(id: string): Promise<Users | null> {
    try {
      return await User.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async create({ name, email, phone, password }: IUser): Promise<Users | null> {
    const hashedPassword = await hash(password, 8);
    const data = {
      name,
      email,
      phone,
      password: hashedPassword,
    };

    try {
      const user = await User.create({
        data,
      });
      return user;
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async update(id: string | undefined, data: IUser): Promise<Users | null> {
    try {
      const user = await User.update({
        where: {
          id,
        },
        data,
      });
      return user;
    } catch (error) {
      throw new AppError(error as string);
    }
  }
}
