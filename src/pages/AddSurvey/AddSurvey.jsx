import { useState } from "react";
import Question from "../../components/Question/Question";
import styles from "./AddSurvey.module.scss";
import Button from "../../components/Button/Button";
import { generateUniqueId } from "../../libs/GenerateUniqueId";



const AddSurvey = (props) => {
  const [questions, setQuestions] = useState([
    { id: generateUniqueId(), value: "" },
  ]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { id: generateUniqueId(), value: "" }]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, value } : q))
    );
  };

  return (
    <ul className={styles.container}>
      {questions.map((q) => (
        <li key={q.id}>
          <Question
          
            value={q.value}
            onChange={(e) => handleQuestionChange(q.id, e.target.value)}
            onRemove={() => handleRemoveQuestion(q.id)}
          />
        </li>
      ))}
      <Button onClick={handleAddQuestion}>Додати запитання</Button>
    </ul>
  );
};

export default AddSurvey;
