import { useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Enter your firstname!"),
    last_name: Yup.string().required("Enter your lastname!"),
    email: Yup.string()
      .required("Enter your email!")
      .email("Enter emailing correctly!"),
    password: Yup.string()
      .min(4, "Password should not be less than 4 items!")
      .max(15, "The password should not be more than 15!")
      .required("Enter your password!"),
  });

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/register", values)
      .then((data) => {
        if (data.status === 201) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 mx-auto p-5 shadow mt-5">
      <h2 className="h1 text-center mb-4">Register</h2>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="mx-auto">
          <div>
            <Field
              name="first_name"
              className="form-control"
              type="text"
              placeholder="First name"
            />
            <span className="text-danger">
              <ErrorMessage name="first_name" />
            </span>
          </div>
          <div className="my-3">
            <Field
              name="last_name"
              className="form-control"
              type="text"
              placeholder="last name"
            />
            <span className="text-danger">
              <ErrorMessage name="last_name" />
            </span>
          </div>
          <div>
            <Field
              name="email"
              className="form-control"
              type="email"
              placeholder="Email"
            />
            <span className="text-danger">
              <ErrorMessage name="email" />
            </span>
          </div>
          <div className="my-3">
            <Field
              name="password"
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <span className="text-danger">
              <ErrorMessage name="password" />
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
