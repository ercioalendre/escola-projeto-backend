import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function checkNewStaffMemberForm(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { name, email, phone, role } = req.body;
  const formData = { name, email, phone, role };
  const inputError: string[] = [];
  let message = "";
  const parsedName = name.toUpperCase();
  const regName = new RegExp("^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$");
  const regEmail = new RegExp("^[^@\\s]+@[^@\\s]+\\.+[^@\\s]{2,}$");
  const regPhone = new RegExp("^(?:\\()[0-9]{2}(?:\\))\\s[0-9]{4,5}(?:-)[0-9]{4}$");
  const regRole = new RegExp("^[a-zA-Z]+$");

  Object.entries(formData).forEach(([key, val]) => {
    if (val) {
      if (key === "name") {
        if (!regName.test(parsedName)) {
          message = "O nome completo inserido é inválido.";
          inputError.push(key);
        }
      }
      if (key === "email") {
        if (!regEmail.test(email)) {
          message = "O endereço de e-mail inserido é inválido.";
          inputError.push(key);
        }
      }
      if (key === "phone") {
        if (!regPhone.test(phone)) {
          message = "O número de telefone inserido é inválido.";
          inputError.push(key);
        }
      }
      if (key === "role") {
        if (!regRole.test(role)) {
          message = "O cargo inserido é inválido.";
          inputError.push(key);
        }
      }
    } else {
      inputError.push(key);
      let keyName;
      if (key === "name") keyName = "nome completo";
      if (key === "email") keyName = "e-mail";
      if (key === "phone") keyName = "telefone";
      if (key === "role") keyName = "cargo";
      message = `O campo ${keyName} é obrigatório.`;
    }

    message = inputError.length <= 1 ? message : "Um ou mais valores inseridos são inválidos.";

    if (message) {
      throw new AppError(message, 400);
    }
  });

  res.locals.formData = {
    name: parsedName,
    email,
    phone,
    role,
  };
  next();
}
