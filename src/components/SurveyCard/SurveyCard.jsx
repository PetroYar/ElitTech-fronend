import { Link } from "react-router-dom";
import styles from "./SurveyCard.module.scss";
import { FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
const SurveyCard = ({ data = {} ,onDelete}) => {

  const [isMenuOpen,setIsMenuOpen] = useState(false)

  const { userName, title, description, questionCount, slug, _id, userId,passCount } =
    data;

  const { user } = useAuth();
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <Link to={`/survey/${slug}`} className={styles.link}>
        <h6>{title}</h6>
        <hr />
        <p>{description}</p>
        <hr />
        <div className={styles.bottom}>
          <div className={styles.counts}>
            <span>Запитань: {questionCount}</span>
            <span>Кількість проходжень: {passCount}</span>
          </div>

          <span>Автор: {userName}</span>
        </div>
      </Link>
      {user?._id === userId && (
        <>
          <button  onClick={openMenu} className={styles.menu}>
            <FaEllipsisV />
          </button>
          <div  className={`${styles.option} ${isMenuOpen ? styles.open : ""}`}>
            <Link to={`/edit-survey/${_id}`}>
              <FaEdit />
            </Link>
            <button onClick={() => onDelete(_id)}>
              <FaTrashAlt />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SurveyCard;
