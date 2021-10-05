import { Request, Response } from "express";
import CreateUserService from "@modules/users/services/CreateUser.service";
import CreateUserSessionService from "@modules/users/services/CreateUserSession.service";
import AppError from "@shared/errors/AppError";
import DeleteUserService from "../services/DeleteUser.service";
import EditUserService from "../services/EditUser.service";
import ListOneUserService from "../services/ListOneUser.service";
import ListAllUsersService from "../services/ListAllUsers.service";

export default class UsersController {
  static async listOne(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.body;

    const user = await ListOneUserService.execute(id);

    if (user) {
      return res.status(200).json(user);
    } else {
      throw new AppError("O usuário que você está buscando não foi encontrado.", 404);
    }
  }

  static async listAll(req: Request, res: Response): Promise<Response | undefined> {
    const users = (await ListAllUsersService.execute()) || "";

    if (users && users.length !== 0) {
      return res.status(200).json(users);
    } else {
      throw new AppError("Nenhum usuário foi encontrado em nossa base de dados.", 404);
    }
  }

  static async createUser(req: Request, res: Response): Promise<Response | undefined> {
    const { name, phone, email, password } = res.locals.formData;
    const createNewUser = await CreateUserService.execute({ name, phone, email, password });

    if (createNewUser) {
      const session = await CreateUserSessionService.execute({ email, password });

      if (session) {
        const { id, token } = session;
        return res.status(201).json({
          status: "success",
          message: "Usuário criado com sucesso!",
          id,
          token,
        });
      } else {
        throw new AppError(
          "O usuário foi criado com sucesso porém não foi possível criar uma sessão.",
          500,
        );
      }
    } else {
      throw new AppError("Não foi possível cadastrar este usuário", 500);
    }
  }

  static async createUserSession(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;

    const session = await CreateUserSessionService.execute({
      email,
      password,
    });

    if (session) {
      return res.status(200).json(session);
    } else {
      throw new AppError("Falha na criação da sessão. Por favor, tente novamente.");
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    const deleteUser = await DeleteUserService.execute(id);

    if (deleteUser) {
      return res.status(200).json({
        status: "success",
        message: "Usuário excluído com sucesso!",
      });
    } else {
      throw new AppError("Não foi possível excluir este usuário.", 500);
    }
  }

  static async editUser(req: Request, res: Response): Promise<Response | undefined | void> {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    if (name || email || phone || password) {
      const editUser = await EditUserService.execute({ id, name, email, phone, password });

      if (editUser) {
        res.status(200).json({
          status: "success",
          message: "Usuário editado com sucesso!",
          editUser,
        });
      } else {
        throw new AppError("Não foi possível editar este usuário.", 500);
      }
    } else {
      throw new AppError("Não foi possível editar este usuário: dados inválidos.", 500);
    }
  }
}
