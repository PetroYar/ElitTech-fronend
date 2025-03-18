import styles from "./Input.module.scss";

const Input = ({
  label,
  onChange,
  textarea,
  error,
  className,
  ...props
}) => {
  return (
    <div className={`${styles.input} ${className || ""}`}>
      {label && <label>{label}</label>}
      {textarea ? (
        <textarea
          className={styles.textarea}
          onChange={onChange}
          {...props}
        ></textarea>
      ) : (
        <input className={styles.inputField} onChange={onChange} {...props} />
      )}
      {error && <p className={styles.error}>{error}fdvdv dfvdvddfv</p>}
    </div>
  );
};

export default Input;
