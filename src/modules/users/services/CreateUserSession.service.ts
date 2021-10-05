import jwt from "@config/auth/jwt";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

export default class CreateUserSessionService {
  static async execute({ email, password }: IRequest): Promise<Record<string, unknown>> {
    const user = Object.create(await UsersRepository.findByEmail(email));
    const userPassword = user.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      throw new AppError("E-mail ou senha incorretos.");
    }

    const id = user.id;

    const token = sign({ name: user.name }, jwt.secret, {
      subject: id,
      expiresIn: jwt.expiresIn,
    });

    return {
      id,
      token,
    };
  }
}
