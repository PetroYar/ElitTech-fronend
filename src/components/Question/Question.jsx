import { FaTrashAlt } from "react-icons/fa";
import Input from "../Input/Input";
import styles from "./Question.module.scss";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { generateUniqueId } from "../../libs/GenerateUniqueId";
import { ErrorMessage, Field, FieldArray, useFormikContext } from "formik";

const Question = ({ onRemove, index }) => {
  const { values } = useFormikContext();

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <Field
          as={Input}
          type="text"
          name={`questions.${index}.question`}
          label={"Введіть запитання"}
        />
        <Field
          as={Select}
          label="Оберіть тип відповіді"
          name={`questions.${index}.type`}
          options={[
            { value: "text", label: "Текстове поле" },
            { value: "radio", label: "Один варіант" },
            { value: "checkbox", label: "Кілька варіантів" },
          ]}
        />
        <button type="button" onClick={onRemove}>
          <FaTrashAlt />
        </button>
      </div>
      <FieldArray name={`questions.${index}.options`}>
        {({ push, remove }) => (
          <>
            {values.questions[index]?.type === "radio" ||
            values.questions[index]?.type === "checkbox" ? (
              <>
                <ul>
                  {values.questions[index]?.options?.map(
                    (option, optionIndex) => (
                      <li className={styles.item} key={option.id}>
                        <div>
                          <Field
                            as={Input}
                            type="text"
                            name={`questions.${index}.options.${optionIndex}.value`}
                            placeholder={"варіант відповіді"}
                          />
                          <ErrorMessage
                            name={`questions.${index}.options.${optionIndex}.value`}
                            component="div"
                            className={styles.error}
                          />
                          <button
                            type="button"
                            onClick={() => remove(optionIndex)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </li>
                    )
                  )}
                </ul>
                <Button
                  className={styles.add}
                  type="button"
                  onClick={() => push({ id: generateUniqueId(), value: "" })}
                >
                  Додати варіант
                </Button>
              </>
            ) : null}
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default Question;
