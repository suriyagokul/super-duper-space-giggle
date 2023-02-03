import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import {useAuthStore} from "../store/store"
import { verifyPassword } from '../helper/helper'

import styles from "../styles/Username.module.css";

export default function Password() {

  const navigate = useNavigate();
  const {username} = useAuthStore(state=>state.auth)
  const [{isLoading, apiData, serverError}] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      })
      // console.log(values);
    },
  });

  if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>
  if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>

  return (
    <div className="font-poppins bg-[#dcdce6] bg-venkamala">

    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
          <h2 className="text-sm font-bold">D2D HealthCare</h2>
            <h4 className="text-5xl font-bold ">hello {apiData?.firstName || apiData?.username}</h4>
            <span className="py-2 text-l  text-center text-gray-500 ">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center">
              <img src={apiData?.profile || avatar} alt="avatar" className={styles.profile} />
            </div>

            <div className="textbox flex flex-col items-center">
              <input
                type="text"
                className={styles.textbox}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <div className="py-4 flex justify-center">
                <button type="submit" className={styles.btn}>
                  Sign In
                </button>
              </div>
            </div>

            <div className="py-2 text-center">
              <span className="text-gray-400">
                Forgot Password?{" "}
                <Link to="/recovery" className="text-red-500">
                  Recover Now
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
