import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { validLoginSchema } from "../../libs/ValidationSchema/authSchema";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const { user, login } = useAuth();

  const handleSubmit = async (values) => {
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const welcome = () => {
      if (user) {
        toast.success(`Вітаємо ${user.username}`);
      }
    };
    welcome();
  }, [user]);

  return (
    <div className={styles.container}>
      <h1>Увійти</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validLoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className={styles.form}>
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

            <div className={styles.buttons}>
              <Button type="submit" disabled={!(isValid && dirty)}>
                Увійти
              </Button>

              <Link to={"/registration"}>Ще немає акаунта?</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
