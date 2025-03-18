import { useState } from "react";
import Question from "../../components/Question/Question";
import styles from "./AddSurvey.module.scss";
import Button from "../../components/Button/Button";


const AddSurvey = (props) => {
  const [questions, setQuestions] = useState([""]);
  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, ""]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, value) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? value : q)));
  };
  return (
    <ul className={styles.container}>
      {questions.map((q, index) => (
        <li key={index}>
          <Question
            value={q}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            onRemove={() => handleRemoveQuestion(index)}
          />
        </li>
      ))}
      <Button onClick={handleAddQuestion}>Додати запитання</Button>
    </ul>
  );
};

export default AddSurvey;
