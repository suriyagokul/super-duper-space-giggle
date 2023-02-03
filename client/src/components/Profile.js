import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import toast,{Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../hooks/fetch.hook";
import { profileValidate } from "../helper/validate";
import { updateUser } from "../helper/helper";
import convertToBase64 from "../helper/convert";

import styles from "../styles/Username.module.css";

export default function Register() {

  const navigate = useNavigate()
  const [{isLoading, apiData, serverError}] = useFetch();
  const [file, setFile] = React.useState();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      mobile: apiData?.mobile || '',
      email: apiData?.email || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile || "" });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise,{
        loading: 'Updating...',
        success: <b>Updated Successfully...!</b>,
        error: <b>Could not Update!</b>
      })
      updatePromise.then(function(){
        navigate('/home')
      })
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    console.log(file);
  };

  //logout handler function
  function userLogout(){
    localStorage.removeItem("token");
    navigate('/')
  }

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
            <h4 className="text-5xl font-bold ">Profile</h4>
            <span className="py-2 text-l  text-center text-gray-500 ">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center">
              <label htmlFor="something">
                <img
                  src={apiData?.profile || file || avatar}
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
              <div className="text ">
                <input
                  type="text"
                  className={styles.textbox}
                  style={{ marginRight: "14px" }}
                  placeholder="FirstName"
                  {...formik.getFieldProps("firstName")}
                />
                <input
                  type="text"
                  className={styles.textbox}
                  placeholder="LastName"
                  {...formik.getFieldProps("lastName")}
                />
              </div>

              <div>
                <input
                  type="number"
                  className={styles.textbox}
                  style={{ marginRight: "14px" }}
                  placeholder="Mobile No"
                  {...formik.getFieldProps("mobile")}
                />
                <input
                  type="email"
                  className={styles.textbox}
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
              </div>

              <input
                type="text"
                className={styles.textbox}
                placeholder="Address"
                style={{ width: "100%" }}
                {...formik.getFieldProps("address")}
              />

              <div className="py-3 flex justify-center">
                <button type="submit" className={styles.btn}>
                  Update
                </button>
              </div>
            </div>

            <div className="py-2 text-center">
              <span className="text-gray-400">
                Comeback Later?{" "}
                <Link to="/" onClick={userLogout} className="text-red-500">
                  Logout
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
