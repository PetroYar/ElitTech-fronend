import { Link } from "react-router-dom";
import styles from "./SurveyCard.module.scss";
import { FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
const SurveyCard = ({ data = {} }) => {
  const { user, title, description, passCount,slug } = data;
  return (
    <div className={styles.container}>
      <Link to={`/survey/${slug}`} className={styles.link}>
        <h6>{title}</h6>
        <hr />
        <p>{description}</p>
        <hr />
        <div className={styles.bottom}>
          <span>запитань: {passCount}</span>
          <span>Автор: {user}</span>
        </div>
      </Link>
      <button className={styles.menu}>
        <FaEllipsisV />
      </button>
      <div className={styles.option}>
        <Link to="/edit">
          <FaEdit />
        </Link>
        <button>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default SurveyCard;
