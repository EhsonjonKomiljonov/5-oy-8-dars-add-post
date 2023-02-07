import { useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const validateSchema = Yup.object({
    user_email: Yup.string()
      .required("Enter your email!")
      .email("Enter emailing correctly!"),
    user_password: Yup.string()
      .min(4, "Password should not be less than 4 items!")
      .max(15, "The password should not be more than 15!")
      .required("Enter your password!"),
  });

  const initialValues = {
    user_email: "",
    user_password: "",
  };

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/login", {
        email: values.user_email,
        password: values.user_password,
      })
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 mx-auto p-5 shadow mt-5">
      <h2 className="h1 text-center mb-4">Login</h2>
      <Formik
        validationSchema={validateSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto">
          <div>
            <Field
              className="form-control"
              type="email"
              name="user_email"
              placeholder="Email"
            />
            <span className="text-danger">
              <ErrorMessage name="user_email" />
            </span>
          </div>
          <div className="my-3">
            <Field
              className="form-control"
              type="password"
              name="user_password"
              placeholder="Password"
            />
            <span className="text-danger">
              <ErrorMessage name="user_password" />
            </span>
          </div>
          <button type="submit" className="btn btn-primary">
            SEND
          </button>
        </Form>
      </Formik>
    </div>
  );
};
