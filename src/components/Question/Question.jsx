import { FaTrashAlt } from "react-icons/fa";
import Input from "../Input/Input";
import styles from "./Question.module.scss";
import { useState } from "react";
import Select from "../Select/Select";
import Button from "../Button/Button";

const Question = ({onRemove}) => {
  const [inputType, setInputType] = useState("");
  const [options, setOptions] = useState([""]);

  const handleChange = (e) => {
    setInputType(e.target.value);
  };
  const handleAddOption = () => {
    setOptions(prev=> [...prev, ""]);
  };
  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

const handleOptionChange = (index, value) => {
  setOptions((prevOptions) =>
    prevOptions.map((option, i) => (i === index ? value : option))
  );
};

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <Input type="text" label={"Введіть запитання"} />
        <Select
          label="Оберіть тип відповіді"
         
          options={[
            { value: "text", label: "Текстове поле" },
            { value: "radio", label: "Один варіант" },
            { value: "check", label: "Кілька варіантів" },
          ]}
          onChange={handleChange}
        />
        <button onClick={onRemove}><FaTrashAlt/></button>
      </div>
      {(inputType === "radio" || inputType === "check") && (
        <>
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <div>
                  <Input
                    type="text"
                    placeholder={
                      index === 0 ? "правильна відповідь" : "варіант відповіді"
                    }
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Button
            className={styles.add}
            type="button"
            onClick={handleAddOption}
          >
            Додати варіант
          </Button>
        </>
      )}
      <hr />
    </div>
  );
};

export default Question;
