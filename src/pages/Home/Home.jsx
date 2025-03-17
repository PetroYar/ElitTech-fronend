import SurveyCard from "../../components/SurveyCard/SurveyCard";

import styles from "./Home.module.scss";

const Home = (props) => {
 
 
  return (
    <div className={styles.container}>
      <SurveyCard />
      <SurveyCard />
      <SurveyCard />
      <SurveyCard />
    </div>
  );
};

export default Home;
