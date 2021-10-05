import AppError from "@shared/errors/AppError";

export default class CheckFields {
  static inputName(name: string): void | boolean {
    if (name) {
      const regName = new RegExp("^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$");

      if (!regName.test(name)) {
        throw new AppError("O nome completo inserido é inválido.", 422);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputEmail(email: string): void | boolean {
    if (email) {
      const regEmail = new RegExp("^[^@\\s]+@[^@\\s]+\\.+[^@\\s]{2,}$");

      if (!regEmail.test(email)) {
        throw new AppError("O endereço de e-mail inserido é inválido.", 422);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputPhone(phone: string): void | boolean {
    if (phone) {
      const regPhone = new RegExp("^(?:\\()[0-9]{2}(?:\\))\\s[0-9]{4,5}(?:-)[0-9]{4}$");

      if (!regPhone.test(phone)) {
        throw new AppError("O número de telefone inserido é inválido.", 422);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputPassword(password: string): void | boolean {
    if (password) {
      if (password.length < 6) {
        throw new AppError("A senha inserida deve conter seis ou mais caracteres.", 422);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputRole(role: string): void | boolean {
    if (role) {
      const regRole = new RegExp("^[a-zA-Z]+$");
      if (!regRole.test(role)) {
        throw new AppError("O campo cargo deve conter apenas letras.", 422);
      } else {
        return true;
      }
    } else {
      throw new AppError("O campo cargo é obrigatório.", 422);
    }
  }
}
