import { Staff } from ".prisma/client";
import StaffRepository from "@modules/staff/models/repositories/Staff.repository";

export default class ListOneStaffMemberService {
  static async execute(staffMemberId: string): Promise<Staff | null> {
    const staffMember = await StaffRepository.findById(staffMemberId);

    return staffMember;
  }
}
