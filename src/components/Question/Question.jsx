import { FaTrashAlt } from "react-icons/fa";
import Input from "../Input/Input";
import styles from "./Question.module.scss";
import { useState } from "react";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { generateUniqueId } from "../../libs/GenerateUniqueId";

const Question = ({ onRemove }) => {
  const [inputType, setInputType] = useState("");
  const [options, setOptions] = useState([
    { id: generateUniqueId(), value: "" },
  ]);

  const handleChange = (e) => {
    setInputType(e.target.value);
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, { id: generateUniqueId(), value: "" }]);
  };

  const handleRemoveOption = (optionId) => {
    setOptions((prev) => prev.filter((option) => option.id !== optionId));
  };

  const handleOptionChange = (optionId, value) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === optionId ? { ...option, value } : option
      )
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
        <button onClick={ onRemove}>
          <FaTrashAlt />
        </button>
      </div>
      {(inputType === "radio" || inputType === "check") && (
        <>
          <ul>
            {options.map((option) => (
              <li key={option.id}>
                <div>
                  <Input
                    type="text"
                    placeholder={
                      options[0].id === option.id
                        ? "правильна відповідь"
                        : "варіант відповіді"
                    }
                    value={option.value}
                    onChange={(e) =>
                      handleOptionChange(option.id, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(option.id)}
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
