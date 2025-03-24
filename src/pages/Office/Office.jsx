import { useEffect, useState } from "react";
import styles from "./Office.module.scss";
import { getData } from "../../libs/Services";
import { useAuth } from "../../hooks/useAuth";
import ActivityChart from "./Charts/ActivityChart";
import DataForChart from "./Charts/DataForChart";

const Office = (props) => {
  const [stats, setStats] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const { user } = useAuth();
 
const [selectedQuestion, setSelectedQuestion] = useState("");


  useEffect(() => {
    const getSurveys = async () => {
      try {
        const res = await getData(`/survey/${user?._id}`);
        setSurveys(res);
        console.log(res);
      } catch (error) {
        console.error("Помилка отримання статистики:", error);
        if (error.response) {
          console.error(error.response.data);
        }
      }
    };
    getSurveys();
  }, []);

  const getStats = async (id) => {
    try {
      const res = await getData(`/answer/stats/${id}`);
      setStats(res);
      console.log("Статистика опитування:", res);
    } catch (error) {
      console.error("Помилка отримання статистики:", error);
      if (error.response) {
        console.error("Відповідь сервера:", error.response.data);
      }
    }
  };

  const getSurveyId = (id) => {
    getStats(id);
  };

 const handleQuestionChange = (selectedQuestion) => {
   setSelectedQuestion(selectedQuestion);
 };

  return (
    <div className={styles.container}>
      <select onChange={(e) => getSurveyId(e.target.value)}>
        <option value="">Виберіть опитування</option>
        {surveys.map((survey) => {
          return (
            <option key={survey?._id} value={survey?._id}>
              {survey?.title}
            </option>
          );
        })}
      </select>

      {/* <ActivityChart activityStats={stats?.activityStats} /> */}

      {/* <pre>{JSON.stringify(stats, null, 2)}</pre> */}
      {stats && (
        <select
          onChange={(e) => handleQuestionChange(e.target.value)}
          value={selectedQuestion}
        >
          <option value="">Виберіть Запитання</option>
          {Object.keys(stats?.answersStats).map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>
      )}
      <DataForChart data={stats?.answersStats[selectedQuestion] || []} />
    </div>
  );
};

export default Office;
