import { Link } from "react-router-dom";
import styles from "./SurveyCard.module.scss";
import { FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
const SurveyCard = ({ data = {} }) => {
  const { user, name, description, passCount } = data;
  return (
    <div className={styles.container}>
      <h6>{name}</h6>
      <hr />
      <p>{description}</p>
      <hr />
      <div className={styles.bottom}>
        <span>запитань: {passCount}</span>

        < >Автор: {user}</>
      </div>
      <button className={styles.menu}>
        <FaEllipsisV />
      </button>
      <div className={styles.option}>
        <Link href="/edit">
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
