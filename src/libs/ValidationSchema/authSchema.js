import * as Yup from "yup";

export const validLoginSchema = Yup.object({
  email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Пароль повинен містити хоча б 6 символів")
    .required("Обов'язкове поле"),
});

export const validRegistrationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Мінімум 2 символи")
    .required("Обов'язкове поле"),
  email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі не співпадають")
    .required("Обов'язкове поле"),
});
