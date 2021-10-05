import { Staff } from ".prisma/client";
import StaffRepository from "@modules/staff/models/repositories/Staff.repository";
import AppError from "@shared/errors/AppError";
import { IStaffMember } from "../models/interfaces/Staff.interface";

export default class CreateStaffMemberService {
  static async execute({
    name,
    phone,
    email,
    role,
  }: IStaffMember): Promise<Staff | null | undefined> {
    const emailExists = await StaffRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Este endereço de e-mail já está cadastrado.");
    }

    const phoneExists = await StaffRepository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError("Este número de telefone já está cadastrado.");
    }

    return await StaffRepository.create({
      name: name.toUpperCase(),
      email,
      phone,
      role,
    });
  }
}
