import Input from "../../../components/Input/Input";
import styles from "./QuestionInput.module.scss";
import { Field, ErrorMessage } from "formik";

const QuestionInput = ({ question }) => {
  if (question.type === "text") {
    return (
      <div>
        <Field name={question._id} as={Input} className={styles.inputText} type="text" />
        <ErrorMessage
          name={question._id}
          component="div"
          className={styles.error}
        />
      </div>
    );
  }

  return (
    <ul className={styles.listOption}>
      {question.options.map((option, index) => (
        <li key={index}>
          <div>
            <Field
              className={styles.input}
              type={question.type}
              name={question._id}
              value={option}
            />
            <p>{option}</p>
          </div>
          <ErrorMessage
            name={question._id}
            component="div"
            className={styles.error}
          />
        </li>
      ))}
    </ul>
  );
};

export default QuestionInput;
