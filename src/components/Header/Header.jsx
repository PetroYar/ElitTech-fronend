import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = (props) => {
  const user = true
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={"./logo.png"} alt="logo question" />
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to={"/add-survey"}>Додати опитування</NavLink>
            </li>
            <li>
              <NavLink to={"/office"}>Мій кабінет</NavLink> 
            </li>
          </ul>
        </nav>
        {user ? <Link to={"/login"}>Увійти</Link> : <button>Вийти</button>}
      </div>
    </header>
  );
};

export default Header;
