import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/store";
import { generateOTP,verifyOTP } from "../helper/helper";

import styles from "../styles/Username.module.css";
import  toast, { Toaster }  from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Recovery() {

  const navigate = useNavigate()
  const {username} = useAuthStore(state=>state.auth);
  const [OTP,setOTP] = useState();

  useEffect(()=>{
    generateOTP(username).then((OTP)=>{
      // console.log(OTP);
      if(OTP) {
        return toast.success("otp has been send to your email")
      }
      else return toast.error("Problem while generating OTP!")
    });
  }, [username])

  async function onSubmit(e){
    e.preventDefault();

    try {
      let {status} =  await verifyOTP({username, code: OTP});
      if(status===201){
        toast.success("Verify Successfully!");
        return navigate('/reset');
    }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!")

    }
  }

  //handler resend otp
  function resendOTP(){
    let sentPromise = generateOTP(username);
    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    })
    sentPromise.then(OTP=>{
      // console.log(OTP);
    })
  }

  return (
    <div className="font-poppins bg-[#dcdce6] bg-venkamala">

    <div className="container mx-auto ">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
          <h2 className="text-sm font-bold">D2D HealthCare</h2>
            <h4 className="text-5xl font-bold ">Recovery</h4>
            <span className="py-2 text-l  text-center text-gray-500 ">
              Get Otp to reset Password!
            </span>
          </div>

          <form className="pt-16" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-400">
                  Enter 6 digit OTP sent to your email address
                </span>
              </div>
              <input type="text" onChange={(e)=>{setOTP(e.target.value)}} className={styles.textbox} placeholder="OTP" />

              <div className="py-4 flex justify-center">
                <button type="submit" className={styles.btn}>
                  Recover
                </button>
              </div>
            </div>
            {/* Using react router dom Link instead of html anchor tag.. Because if we use a tag it will refresh and moves onto another page.
                  In SPA we don't use like this By using Link page dynamically changes without reloading.. 
                */}
          </form>
          <div className="py-2 text-center">
              <span className="text-gray-400">
                Can't get otp? <button onClick={resendOTP} className="text-red-500">Resend</button>
              </span>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
