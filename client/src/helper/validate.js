import toast from "react-hot-toast";
import {authenticate} from "./helper"


export async function userNameValidate(values) {
  const errors = userNameVerify({}, values);
  
  if(values.username){
    const {status} = await authenticate(values.username);
    if(status!=200){
     errors.exist =  toast.error("User doesn't exist!");
    }
  }
  return errors;
}

function userNameVerify(errors = {}, values) {
  if (!values.username) {
    toast.error("Username is Required...!");
  } else if (values.username.includes(" ")) {
    toast.error("Invalid Username..!");
  }

  return errors;
}

export function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    toast.error("Password is Required...!");
  } else if (values.password.includes(" ")) {
    toast.error("Invalid Password..!");
  } else if (values.password.length <= 4) {
    toast.error("Password Should Contain atleast 5 Characters.");
  } else if (!specialChars.test(values.password)) {
    toast.error("Password must contain a Special Character.");
  }

  return errors;
}

export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirmPassword) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

export async function registerValidation(values) {
  const errors = userNameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function profileValidate(values) {
  const errors = emailVerify({}, values);
  return errors;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required..!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email..!");
  } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
    error.email = toast.error("Invalid email address..!");
  }
  return error;
}


function dateVerify(errors = {}, values) {
  if (!values.date) {
    toast.error("Date is Required...!");
  }
  return errors;
}

function timeVerify(errors = {}, values) {
  if (!values.time) {
    toast.error("Time is Required...!");
  }
  return errors;
}

export async function appointmentValidation(values) {
  // console.log(values);
  const errors = dateVerify({}, values);
  timeVerify(errors, values);

  return errors;
}
