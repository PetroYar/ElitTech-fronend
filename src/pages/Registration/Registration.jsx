import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Registration.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { validRegistrationSchema } from "../../libs/ValidationSchema/authSchema";

const Registration = () => {
  const { user, registration } = useAuth();


  const handleSubmit = async (values) => {
    const { confirmPassword, ...dataToSend } = values;
    try {
      const test = await registration(dataToSend)
      console.log(test);
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className={styles.container}>
      <h1>Зареєструватися</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validRegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className={styles.form}>
            <div>
              <Field
                as={Input}
                label="Ім'я"
                type="text"
                name="username"
                autoComplete="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                as={Input}
                label="E-mail"
                type="email"
                name="email"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                as={Input}
                label="Пароль"
                type="password"
                name="password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                as={Input}
                label="Підтвердити пароль"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.buttons}>
              <Button type="submit" disabled={!(isValid && dirty)}>
                Зареєструватись
              </Button>

              <Link to="/login">Вже є акаунт?</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
