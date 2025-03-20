import styles from "./Button.module.scss";

const Button = ({ children, onClick, className,type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
