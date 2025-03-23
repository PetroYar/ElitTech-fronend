import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import useWindowSize from "../../hooks/useWindowSize";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Header = (props) => {
  const [activeBurger, setActiveBurger] = useState(false);

  const { width } = useWindowSize();
  const mobile = 540;

  const {user,logout} = useAuth()

  const toggleBurger = () => {
    setActiveBurger(!activeBurger);

    if (!activeBurger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeBurger = () => {
    setActiveBurger(false);

    document.body.style.overflow = "";
  };

  const renderAuthButton = () => {
    return !user ? (
      <Link onClick={closeBurger} className={styles.login} to="/login">
        Увійти
      </Link>
    ) : (
      <button
        onClick={() => {
          logout();
          closeBurger();
        }}
        className={styles.login}
      >
        Вийти
      </button>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link onClick={closeBurger} to={"/"} className={styles.logo}>
          <img src={"/logo.png"} alt="logo question" />
        </Link>
        <nav className={!activeBurger ? styles.isActiveNav : ""}>
          <ul>
            <li onClick={closeBurger}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Головна
              </NavLink>
            </li>
            <li onClick={closeBurger}>
              <NavLink
                to="/add-survey"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Додати опитування
              </NavLink>
            </li>
            <li onClick={closeBurger}>
              <NavLink
                to="/office"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Мій кабінет
              </NavLink>
            </li>
           
          </ul>
          {mobile > width && renderAuthButton()}
        </nav>
        {mobile < width && renderAuthButton()}
        {mobile > width && (
          <>
            <button
              onClick={toggleBurger}
              className={`${styles.burger} ${
                activeBurger ? styles.isActive : ""
              } `}
            >
              <span></span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
