import { useState, useEffect } from "react";
import SurveyCard from "../../components/SurveyCard/SurveyCard";

import styles from "./Home.module.scss";
import { deleteData, getData } from "../../libs/Services";

const Home = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getSurvey = async (params) => {
      try {
        const req = await getData("/survey");
       
        setData(req);
        console.log(req)
      } catch (error) {
        console.error(error);
      }
    };
    getSurvey();
  }, []);

  const deliteSurvey = async (id) => {
    try {
      const req = await deleteData(`/survey/${id}`);
      setData((prevData) => ({
        ...prevData,
        surveys: prevData.surveys.filter((survey) => survey._id !== id),
      }));
      console.log(req);
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  return (
    <div className={styles.container}>
      <ul>
        {data?.surveys.map((survey) => {
          return (
            <li key={survey._id}>
              <SurveyCard data={survey} onDelete={deliteSurvey} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
