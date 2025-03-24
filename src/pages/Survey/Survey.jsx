import { useNavigate, useParams, useRoutes } from "react-router-dom";
import styles from "./Survey.module.scss";
import { getData, postData } from "../../libs/Services";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import QuestionInput from "./QuestionInput/QuestionInput";
import { validAnswerSchema } from "../../libs/ValidationSchema/answerSchema";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button/Button";

const Survey = (props) => {
  const [data, setData] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [startTime, setStartTime] = useState(null);

  const { slug } = useParams();
  const { user } = useAuth();
  const navigation = useNavigate()

  useEffect(() => {
    const getSurveyByQuestion = async (params) => {
      try {
        const res = await getData(`/survey/questions/${slug}`);
        setData(res);

        const initial = {};
        res.questions.forEach((q) => {
          initial[q._id] = q.type === "checkbox" ? [] : "";
        });
        setInitialValues(initial);

        const schema = validAnswerSchema(res.questions);
        setValidationSchema(schema);

        setStartTime(new Date().toISOString());
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };
    getSurveyByQuestion();
  }, [slug]);

  const handleSubmit = async (values, { resetForm }) => {

    const endTime = new Date().toISOString();

    const newAnswers = {
      surveyId: data?._id,
      userId: user?._id,
      userAnswers: Object.entries(values).map(([questionId, answer]) => ({
        question: questionId,
        answer: answer,
      })),
      startTime,
      endTime,
    };


    try {
      const res = await postData(`/answer`, newAnswers)
      navigation(`/result/${res._id}`)
      resetForm()
    } catch (error) {
      console.error(error)
    }
    
  };

  return (
    <>
      {data && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({}) => (
            <Form className={styles.container}>
              <h1>{data.title}</h1>
              <p className={styles.description}>{data.description}</p>
              <ul className={styles.list}>
                {data.questions.map((q) => (
                  <li key={q._id}>
                    <h6>{q.question}</h6>
                    <QuestionInput question={q} />
                    <hr />
                  </li>
                ))}
              </ul>
              <Button className={styles.button} type="submit">Відправити</Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Survey;
