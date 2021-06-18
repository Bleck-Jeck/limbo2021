import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {

  // userName
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Минимум 2 символа",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Такое имя не подойдет",
      },
    ];
  }
  // Email

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Неверный Email",
      },
    ];
  }


  // Password
  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Минимум 2 символа",
      },
    ];
  }
  if (options.password.length != options.password_confitm.length) {
    return [
      {
        field: "password_confitm",
        message: "Пароль не совпадает",
      },
    ];
  }

  return null;
};
