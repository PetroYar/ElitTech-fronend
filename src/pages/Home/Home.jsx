import { useState, useEffect } from "react";
import SurveyCard from "../../components/SurveyCard/SurveyCard";

import styles from "./Home.module.scss";
import { deleteData, getData } from "../../libs/Services";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import toast from "react-hot-toast";

const Home = (props) => {
  const [data, setData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const start = Number(searchParams.get("start")) || 0;
  const limit =4;
  useEffect(() => {
    const getSurvey = async (params) => {
      try {
        const req = await getData(`/survey?_start=${start}&_limit=${limit}`);

        setData(req);
        console.log(req);
      } catch (error) {
        console.error(error);
      }
    };
    getSurvey();
  }, [start]);

  const deliteSurvey = async (id) => {
    try {
      const req = await deleteData(`/survey/${id}`);
      setData((prevData) => ({
        ...prevData,
        surveys: prevData.surveys.filter((survey) => survey._id !== id),
      }));
      toast.success('Опитування видалено')
      
      console.log(req);
    } catch (error) {
      console.error("Error deleting survey:", error);
      toast.error("Сталася помилка спробуйте пізніше");

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
     <Pagination start={start} firstPage={data?.firstPage} lastPage={data?.lastPage} limit={limit} currentPage={data?.currentPage} />
    </div>
  );
};

export default Home;
