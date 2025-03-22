import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Question from "../../components/Question/Question";
import styles from "./EditSurvey.module.scss";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { validSurveySchema } from "../../libs/ValidationSchema/surveySchema";
import { getData, updateData } from "../../libs/Services";

const EditSurvey = () => {
  const {slug} = useParams(); 
  const navigation = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const loadSurvey = async () => {
      try {
    
        const survey = await getData(`/survey/questions/${slug}`);

        if (survey) {
          const questions = survey.questions || [];
          setInitialValues({
            title: survey.title,
            description: survey.description,
            questions: questions.map((q) => ({
              id: q._id,
              question: q.question,
              type: q.type,
              options: q.options.map((opt) => ({ value: opt })),
            })),
          });
        }
      } catch (error) {
        console.error("Error loading survey:", error);
      }
    };
    loadSurvey();
  }, [slug]); 

  const handleSubmit = async (values) => {
    try {
      await updateData(`/survey/${slug}`, {
        title: values.title,
        description: values.description,
        questionCount: values.questions.length,
      });

      const updateQuestionPromises = values.questions.map((q) =>
        updateData(`/question/${q.id}`, {
          question: q.question,
          type: q.type,
          options: q.options.map((option) => option.value),
        })
      );

      await Promise.all(updateQuestionPromises);
      navigation("/"); 
    } catch (error) {
      console.error("Error updating survey:", error);
    }
  };

  if (!initialValues) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validSurveySchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form className={styles.container}>
          <Field as={Input} label="Заголовок" name="title" />
          <ErrorMessage name="title" component="div" className={styles.error} />
          <Field as={Input} label="Опис" name="description" />
          <ErrorMessage
            name="description"
            component="div"
            className={styles.error}
          />

          <FieldArray name="questions">
            {({ remove }) => (
              <>
                <ul>
                  {values.questions.map((q, index) => (
                    <li key={q.id} className={styles.item}>
                      <Question index={index} onRemove={() => remove(index)} />
                    </li>
                  ))}
                </ul>
                <Button type="submit">Зберегти зміни</Button>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default EditSurvey
