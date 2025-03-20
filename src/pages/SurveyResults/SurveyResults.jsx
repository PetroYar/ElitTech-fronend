import { useEffect, useState } from "react";
import styles from "./SurveyResults.module.scss";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../libs/Services";

const SurveyResults = (props) => {
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const res = await getData(`/answer/${id}`);
        setData(res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    getAnswers();
  }, [id]);

const duration = `${Math.floor(data?.duration / 60)}хв  ${(
  data?.duration % 60
).toFixed(0)} с`;

  return (
    <div className={styles.container}>
      <h1>Ваші відповіді</h1>
      <ul>
        {data?.questionsWithAnswers.map((item) => {
          const answerText = Array.isArray(item.answer)
            ? item.answer.join(", ")
            : item.answer;
          return (
            <li key={item._id}>
              <p><span>запитання:</span> {item.question}</p>
              <p> відповідь : {answerText}</p>
            </li>
          );
        })}
      </ul>
      <span>Час проходження {duration}</span>
      <Link to={`/`}> закрити </Link>
    </div>
  );
};

export default SurveyResults;
