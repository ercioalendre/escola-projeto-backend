import { Staff } from ".prisma/client";
import AppError from "@shared/errors/AppError";
import StaffRepository from "../models/repositories/Staff.repository";

export default class DeleteStaffMemberService {
  static async execute(staffMemberId: string): Promise<Staff | null> {
    const staffMember = await StaffRepository.findById(staffMemberId);

    if (!staffMember) {
      throw new AppError("O funcionário que você está tentando excluir não foi encontrado.", 404);
    }

    return await StaffRepository.deleteById(staffMemberId);
  }
}
