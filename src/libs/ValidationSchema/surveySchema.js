import * as Yup from "yup";

export const validSurveySchema = Yup.object().shape({
  title: Yup.string().required("Поле обов'язкове"),
  description: Yup.string().required("Поле обов'язкове"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Поле обов'язкове"),
        type: Yup.string().required("Поле обов'язкове"),
        options: Yup.array().when("type", (type, schema) => {
          if (type === "radio" || type === "check") {
            return schema
              .of(
                Yup.object().shape({
                  value: Yup.string().required("Поле обов'язкове"),
                })
              )
              .min(1, "Мінімум один варіант відповіді");
          }
          return schema;
        }),
      })
    )
    .min(1, "Мінімум одне питання"),
});
