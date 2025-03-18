import styles from "./Button.module.scss";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className ? styles.className : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
