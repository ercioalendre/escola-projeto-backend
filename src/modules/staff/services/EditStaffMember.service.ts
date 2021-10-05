import AppError from "@shared/errors/AppError";
import CheckFields from "@shared/http/providers/CheckFields.provider";
import StaffRepository from "../models/repositories/Staff.repository";
import { IStaffMember } from "../models/interfaces/Staff.interface";
import { Staff } from ".prisma/client";

export default class EditStaffMemberService {
  static async execute({ id, name, email, phone, role }: IStaffMember): Promise<Staff | null> {
    const data = await StaffRepository.findById(id);

    if (!data) {
      throw new AppError("Funcionário não encontrado.", 401);
    }

    data.updatedAt = new Date();

    if (name && CheckFields.inputName(name)) {
      data.name = name.toUpperCase();
    }

    if (email && CheckFields.inputEmail(email)) {
      const emailExists = await StaffRepository.findByEmail(email);

      if (emailExists) {
        if (emailExists.id === id) {
          throw new AppError("Este funcionário já está usando o e-mail que está tentando alterar.");
        } else {
          throw new AppError("O e-mail que você está tentando utilizar já está em uso.");
        }
      }

      data.email = email;
    }

    if (phone && CheckFields.inputPhone(phone)) {
      data.phone = phone;
    }

    if (role && CheckFields.inputPassword(role)) {
      data.role = role;
    }

    return await StaffRepository.update(id, data);
  }
}
