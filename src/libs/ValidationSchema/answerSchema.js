import * as Yup from "yup";

export const validAnswerSchema = (questions) => {
  const schema = {};
  questions.forEach((q) => {
    if (q.type === "text") {
      schema[q._id] = Yup.string().required("Це поле обов'язкове");
    } else if (q.type === "radio") {
      schema[q._id] = Yup.string().required("Виберіть один варіант");
    } else if (q.type === "checkbox") {
      schema[q._id] = Yup.array().min(1, "Виберіть хоча б один варіант");
    }
  });
  return Yup.object().shape(schema);
};
