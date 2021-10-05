import { Staff } from ".prisma/client";
import StaffRepository from "@modules/staff/models/repositories/Staff.repository";
import AppError from "@shared/errors/AppError";

export default class ListAllStaffMembersService {
  static async execute(): Promise<Staff[] | null> {
    const staffMembers = await StaffRepository.findAll();

    return staffMembers;
  }
}
