import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import ListAllStaffMembersService from "../services/ListAllStaffMembers.service";
import ListOneStaffMemberService from "../services/ListOneStaffMember.service";
import CreateStaffMemberService from "../services/CreateStaffMember.service";
import DeleteStaffMemberService from "../services/DeleteStaffMember.service";
import EditStaffMemberService from "../services/EditStaffMember.service";

export default class StaffController {
  static async listOne(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.body;

    const staffMember = await ListOneStaffMemberService.execute(id);

    if (staffMember) {
      return res.status(200).json(staffMember);
    } else {
      throw new AppError("O funcionário que você está buscando não foi encontrado.", 404);
    }
  }

  static async listAll(req: Request, res: Response): Promise<Response | undefined> {
    const staffMembers = (await ListAllStaffMembersService.execute()) || "";

    if (staffMembers && staffMembers.length !== 0) {
      return res.status(200).json(staffMembers);
    } else {
      throw new AppError("Nenhum funcionário foi encontrado em nossa base de dados.", 404);
    }
  }

  static async createStaffMember(req: Request, res: Response): Promise<Response | undefined> {
    const { name, phone, email, role } = res.locals.formData;
    const newStaffMember = await CreateStaffMemberService.execute({
      name,
      phone,
      email,
      role,
    });

    if (newStaffMember) {
      return res.status(201).json(newStaffMember);
    } else {
      throw new AppError("Não foi possível cadastrar este funcionário", 500);
    }
  }

  static async deleteStaffMember(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    const deleteStaffMember = await DeleteStaffMemberService.execute(id);

    if (deleteStaffMember) {
      return res.status(200).json({
        status: "success",
        message: "Funcionário excluído com sucesso!",
      });
    } else {
      throw new AppError("Não foi possível excluir este funcionário.", 500);
    }
  }

  static async editStaffMember(req: Request, res: Response): Promise<Response | undefined | void> {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;

    if (name || email || phone || role) {
      const editStaffMember = await EditStaffMemberService.execute({
        id,
        name,
        email,
        phone,
        role,
      });

      if (editStaffMember) {
        res.status(200).json({
          status: "success",
          message: "Funcionário editado com sucesso!",
          editStaffMember,
        });
      } else {
        throw new AppError("Não foi possível editar este funcionário.", 500);
      }
    } else {
      throw new AppError("Não foi possível editar este funcionário: dados inválidos.", 500);
    }
  }
}
