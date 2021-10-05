import AppError from "@shared/errors/AppError";
import { PrismaClient, Staff } from "@prisma/client";
import { IStaffMember } from "../interfaces/Staff.interface";

const prisma = new PrismaClient();
const Staff = prisma.staff;

export default class StaffRepository {
  static async findById(id: string | undefined): Promise<Staff | null> {
    try {
      return await Staff.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findByPhone(phone: string): Promise<Staff | null> {
    try {
      return await Staff.findUnique({
        where: {
          phone,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findByEmail(email: string): Promise<Staff | null> {
    try {
      return await Staff.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async findAll(): Promise<Staff[] | null> {
    try {
      return await Staff.findMany();
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async deleteById(id: string): Promise<Staff | null> {
    try {
      return await Staff.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async create({ name, email, phone, role }: IStaffMember): Promise<Staff | null> {
    const data = {
      name,
      email,
      phone,
      role,
    };

    try {
      const staffMember = await Staff.create({
        data,
      });
      return staffMember;
    } catch (error) {
      console.log(error);
      throw new AppError(error as string);
    }
  }

  static async update(id: string | undefined, data: IStaffMember): Promise<Staff | null> {
    try {
      const staffMember = await Staff.update({
        where: {
          id,
        },
        data,
      });
      return staffMember;
    } catch (error) {
      throw new AppError(error as string);
    }
  }
}
