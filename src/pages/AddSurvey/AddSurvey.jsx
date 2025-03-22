import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";

import Question from "../../components/Question/Question";
import styles from "./AddSurvey.module.scss";
import Button from "../../components/Button/Button";
import { generateUniqueId } from "../../libs/GenerateUniqueId";
import Input from "../../components/Input/Input";
import { validSurveySchema } from "../../libs/ValidationSchema/surveySchema";
import { postData } from "../../libs/Services";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddSurvey = () => {
  const { user } = useAuth();
  const navigation = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const { title, description } = values;

    const newSurvey = {
      title,
      description,
      userId: user._id,
      questionCount: values.questions.length,
    };

    try {
      const surveyRes = await postData("/survey", newSurvey);
      const surveyId = surveyRes?._id;

      if (surveyId) {
        const questions = values.questions.map((q) => ({
          surveyId,
          question: q.question,
          type: q.type,
          options: q.options.map((option) => option.value),
        }));

        const addQuestionPromises = questions.map((question) =>
          postData("/question", question)
        );

        try {
          const questionResponses = await Promise.all(addQuestionPromises);
          resetForm();
          navigation("/");
        } catch (questionError) {
          console.error("Error adding questions:", questionError);
        }
      } else {
        console.error("Could not retrieve survey ID after creation.");
      }
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        questions: [
          { id: generateUniqueId(), question: "", type: "text", options: [] },
        ],
      }}
      validationSchema={validSurveySchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form className={styles.container}>
          <div>
            <Field as={Input} label="Заголовок" name="title" />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>
          <hr />
          <div>
            <Field as={Input} label="Опис" name="description" />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          <hr />

          <FieldArray name="questions">
            {({ push, remove }) => (
              <>
                <ul>
                  {values.questions.map((q, index) => (
                    <li className={styles.item} key={q.id}>
                      <Question index={index} onRemove={() => remove(index)} />
                      {errors.questions &&
                        errors.questions[index] &&
                        touched.questions &&
                        touched.questions[index] && (
                          <div className={styles.error}>
                            {errors.questions[index].question}
                          </div>
                        )}
                      {errors.questions &&
                        errors.questions[index] &&
                        errors.questions[index].options &&
                        touched.questions &&
                        touched.questions[index] &&
                        touched.questions[index].options &&
                        errors.questions[index].options.map(
                          (optionError, optionIndex) => (
                            <div key={optionIndex} className={styles.error}>
                              {optionError?.value}
                            </div>
                          )
                        )}
                    </li>
                  ))}
                </ul>
                <hr />
                <Button
                  type="button"
                  onClick={() =>
                    push({
                      id: generateUniqueId(),
                      question: "",
                      type: "text",
                      options: [],
                    })
                  }
                >
                  Додати запитання
                </Button>
                <Button type="submit">Зберегти анкету</Button>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default AddSurvey;
