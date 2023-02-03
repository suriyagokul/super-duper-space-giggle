import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerValidation } from "../helper/validate";
import {registerUser} from "../helper/helper"

import styles from "../styles/Username.module.css";
import "../index.css"

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = React.useState();

  const formik = useFormik({
    initialValues: {
      email: "suryapeddinti946@gmail.com",
      username: "suriya",
      password: "admin@123",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Registered Successfully...!</b>,
        error : <b>Could not Register.</b>
      });
    registerPromise.then(function(){navigate('/')})
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    console.log(file);
  };

  return (
    <div className="font-poppins bg-[#dcdce6] bg-venkamala">

    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
          <h2 className="text-sm font-bold">D2D HealthCare</h2>
            <h4 className="text-5xl font-bold ">Register</h4>
            <span className="py-2 text-l  text-center text-gray-500 ">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center">
              <label htmlFor="something">
                <img
                  src={file || avatar}
                  alt="avatar"
                  className={styles.profile}
                />
              </label>
              <input
                type="file"
                id="something"
                name="something"
                onChange={onUpload}
              />
            </div>

            <div
              className="textbox flex flex-col items-center"
              style={{ marginBottom: "5px" }}
            >
              <input
                type="email"
                className={styles.textbox}
                placeholder="Email*"
                {...formik.getFieldProps("email")}
              />
              <input
                type="text"
                className={styles.textbox}
                placeholder="Username*"
                {...formik.getFieldProps("username")}
              />
              <input
                type="password"
                className={styles.textbox}
                placeholder="Password*"
                {...formik.getFieldProps("password")}
              />
              <div className="py-3 flex justify-center">
                <button type="submit" className={styles.btn}>
                  Register
                </button>
              </div>
            </div>

            <div className="py-2 text-center">
              <span className="text-gray-400">
                Already have an account?{" "}
                <Link to="/" className="text-red-500">
                  Login
                </Link>
              </span>
            </div>
            {/* Using react router dom Link instead of html anchor tag.. Because if we use a tag it will refresh and moves onto another page.
                  In SPA we don't use like this By using Link page dynamically changes without reloading.. 
                */}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
