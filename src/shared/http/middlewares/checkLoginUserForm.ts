import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function checkNewUserForm(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
  const formData = { email, password };
  const inputError: string[] = [];
  Object.entries(formData).forEach(([key, val]) => {
    if (!val || val == "" || val == undefined) {
      let message;

      if (key === "password") {
        message = "A senha inserida é inválida.";
      }
      if (key === "email") {
        message = "O e-mail inserido é inválido.";
      }

      inputError.push(key);

      message = inputError.length == 1 ? message : "Um ou mais valores inseridos são inválidos.";

      if (message) {
        throw new AppError(message, 400);
      }
    }
  });
  res.locals.formData = {
    email,
  };
  next();
}
