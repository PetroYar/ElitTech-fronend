import styles from "./Select.module.scss";

const Select = ({ onChange,label, options, ...props }) => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <select className={styles.select} onChange={onChange} {...props}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
