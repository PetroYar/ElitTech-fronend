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
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Головна
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-survey"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Додати опитування
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/office"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Мій кабінет
              </NavLink>
            </li>
          </ul>
        </nav>
        {user ? (
          <Link className={styles.login} to={"/login"}>
            Увійти
          </Link>
        ) : (
          <button className={styles.login}>Вийти</button>
        )}
      </div>
    </header>
  );
};

export default Header;
