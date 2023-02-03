import React from "react";
import {useNavigate, Navigate} from "react-router-dom"
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";
import {resetPassword} from "../helper/helper";
import {useAuthStore} from "../store/store";
import useFetch from "../hooks/fetch.hook"

import styles from "../styles/Username.module.css";

export default function Reset() {

  const {username} = useAuthStore(state=>state.auth)
  const navigate = useNavigate();

  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({username, password: values.password});
      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>
      })
      resetPromise.then(function() {
        navigate('/password')
      })
    },
  });

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="font-poppins bg-[#dcdce6] bg-venkamala">
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
          <h2 className="text-sm font-bold">D2D HealthCare</h2>
            <h4 className="text-5xl font-bold ">Reset Password</h4>
            <span className="py-2 text-l  text-center text-gray-500 ">
              Enter New Password.
            </span>
          </div>

          <form className="pt-16" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center">
              <input
                type="text"
                className={styles.textbox}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <input
                type="text"
                className={styles.textbox}
                placeholder="Repeat Password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <div className="py-4 flex justify-center">
                <button type="submit" className={styles.btn}>
                  Reset
                </button>
              </div>
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
